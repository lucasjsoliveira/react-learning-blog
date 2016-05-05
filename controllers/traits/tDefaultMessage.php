<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 26/04/16
 * Time: 22:55
 */

namespace app\controllers\traits;


trait tDefaultMessage
{
    private function getMessageForSuccess($success)
    {
        $msg = $success ? 'Sucesso na operação!' : 'Falha na operação';

        return ['message' => $msg, 'success' => $success];
    }
}