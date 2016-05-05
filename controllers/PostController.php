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
use yii\rest\Controller;

class PostController extends Controller
{
    use tJsonController, tDefaultMessage;

    public function actionIndex()
    {
        return Post::find()->joinWith('tags')->orderBy('data DESC')->all();
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

        foreach ($tagIds as $tagId) {
            $relacao = new PostTag([
                'post_id' => $model->id,
                'tag_id' => $tagId
            ]);
            $relacaoResult = $relacao->save();
            if (!$relacaoResult) {
                $transaction->rollBack();
                return $this->getMessageForSuccess(false);
            }
        }

        $transaction->commit();
        return $this->getMessageForSuccess($success);
    }

    public function actionView($id)
    {
        return Post::findOne($id);
    }

}