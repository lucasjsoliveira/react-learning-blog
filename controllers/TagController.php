<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 14/04/16
 * Time: 12:18
 */

namespace app\controllers;


use app\controllers\traits\tJsonController;
use app\models\Tag;
use yii\rest\Controller;

class TagController extends Controller
{
    use tJsonController;

    public function actionIndex()
    {
        return Tag::find()->orderBy('tag ASC')->all();
    }

    public function actionSubmit()
    {
        $id = \Yii::$app->request->getBodyParam('id');
        $model = ($id) ? Tag::findOne($id) : new Tag();
        $model->load(\Yii::$app->request->getBodyParams(), '');

        $msg = $model->save() ? 'Sucesso na operação!' : 'Falha na operação';

        return $msg;
    }
}