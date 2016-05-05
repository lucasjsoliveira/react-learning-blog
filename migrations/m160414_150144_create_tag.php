<?php

use yii\db\Migration;

class m160414_150144_create_tag extends Migration
{
    public function up()
    {
        $this->createTable('tag', [
            'id' => $this->primaryKey(),
            'tag' => $this->string(255)
        ]);
    }

    public function down()
    {
        $this->dropTable('tag');
    }
}
