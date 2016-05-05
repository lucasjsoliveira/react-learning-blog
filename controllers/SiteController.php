<?php

namespace app\controllers;

use app\controllers\traits\tJsonController;
use Yii;
use yii\rest\Controller;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

class SiteController extends Controller
{
    use tJsonController;
    public function actionIndex()
    {
        $response = Yii::$app->response;
        return [1, 2, 3];
    }
}
