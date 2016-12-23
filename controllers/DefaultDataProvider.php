<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 14/12/16
 * Time: 10:21
 */

namespace app\controllers;


use yii\data\ActiveDataProvider;

class DefaultDataProvider
{
    public $provider;

    public function __construct($query, $page)
    {
        $this->provider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
                'page' => $page - 1
            ]
        ]);
    }
    public function getResult()
    {
        $models = $this->provider->models;
        return [
            'models' => $models,
            'total' => $this->provider->totalCount,
            'page_size' => $this->provider->pagination->pageSize
        ];
    }
}