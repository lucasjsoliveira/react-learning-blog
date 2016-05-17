<?php

namespace app\controllers;

use app\controllers\traits\tJsonController;
use app\models\Usuario;
use Yii;
use yii\rest\Controller;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

class SiteController extends Controller
{
    use tJsonController;
    public function actionLogin()
    {
        $login = Yii::$app->request->getBodyParam('login');
        $senha = Yii::$app->request->getBodyParam('senha');
        
        $result = Usuario::validateLogin($login, $senha);
        if (is_string($result)) {
            return ['success' => false, 'message' => $result];
        }

        Yii::$app->user->login($result);
        return ['success' => true, 'message' => 'Login realizado com sucesso', 'usuario' => $result];
    }

    public function actionSignup()
    {
        $user = new Usuario();
        $user->load(Yii::$app->request->getBodyParams());

        $result = $user->save();

        if ($result)
            return ['success' => true];

        Yii::trace($user->errors);

        return ['success' => false, 'message' => 'Erro no cadastro'];
    }
}
