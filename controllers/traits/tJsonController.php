<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 06/04/16
 * Time: 19:18
 */

namespace app\controllers\traits;


use yii\filters\ContentNegotiator;
use yii\web\Response;

trait tJsonController {
    protected $format = 'json';

    public function behaviors()
    {
        return [
            'contentNegotiator' => [
                'class' => ContentNegotiator::className(),
                'formats' => [
                    'application/json' => Response::FORMAT_JSON
                ],
            ]
        ];
    }
}