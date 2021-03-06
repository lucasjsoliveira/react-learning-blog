<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 14/04/16
 * Time: 16:52
 */

namespace app\controllers;


use app\controllers\traits\tDefaultMessage;
use app\controllers\traits\tJsonController;
use app\models\Post;
use app\models\PostTag;
use app\models\Tag;
use yii\data\ActiveDataProvider;
use yii\rest\Controller;

class PostController extends Controller
{
    use tJsonController, tDefaultMessage;

    public function actionIndex($page = 1)
    {
        $query = Post::find()->joinWith('tags')->orderBy('data DESC');

        $provider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
                'page' => $page
            ]
        ]);

        return [
            'posts' => $provider->models,
            'total' => $provider->totalCount,
            'total_pages' => $provider->pagination->pageCount
        ];
    }

    public function actionSubmit()
    {
        $request = \Yii::$app->request;
        $id = $request->getBodyParam('id');
        $model = ($id) ? Post::findOne($id) : new Post();
        $model->load($request->getBodyParams(), '');

        $transaction = \Yii::$app->db->beginTransaction();
        $success = $model->save();
        if (!$success) {
            $transaction->rollBack();
            return $this->getMessageForSuccess($success);
        }

        $tagIds = $request->getBodyParam('tags');
        if (!$tagIds) {
            $transaction->commit();
            return $this->getMessageForSuccess($success);
        }

        // Apagando relações antigas para recriar
        $tags = PostTag::find()->where(['post_id' => $model->id])->all();
        foreach ($tags as $tag) {
            $tag->delete();
        }

        // Criando tags novas
        foreach ($tagIds as $tagId) {
            $relacao = new PostTag([
                'post_id' => $model->id,
                'tag_id' => $tagId
            ]);
            $relacaoResult = $relacao->save();
            if (!$relacaoResult) {
                \Yii::trace($relacao->errors);
                $transaction->rollBack();
                return $this->getMessageForSuccess(false);
            }
        }

        $transaction->commit();
        return $this->getMessageForSuccess($success);
    }

    public function actionGetByTag($tagId)
    {
        $tag = Tag::findOne($tagId);

        $posts = $tag->posts;

        return [
            'tagName' => $tag->tag,
            'posts' => $posts
        ];
    }

    public function actionEdit($id)
    {
        $post = Post::findOne($id)->toArray();
        $post['tags'] = array_map(function($tag) {
            return $tag['id'];
        }, $post['tags']);
        return $post;
    }

    public function actionView($id)
    {
        return Post::findOne($id);
    }

}