<?php

use yii\db\Migration;

class m160414_150208_create_post extends Migration
{
    public function up()
    {
        $this->createTable('post', [
            'id' => $this->primaryKey(),
            'titulo' => $this->string(255),
            'corpo' => $this->text(),
            'autor' => $this->string(150),
            'data' => $this->dateTime()
        ]);
    }

    public function down()
    {
        $this->dropTable('post');
    }
}
