<?php

use yii\db\Migration;

class m160517_121144_create_usuario extends Migration
{
    public function up()
    {
        $this->createTable('usuario', [
            'id' => $this->primaryKey(),
            'nome' => $this->string(),
            'login' => $this->string(50),
            'senha' => $this->string(50)
        ]);

        $this->createIndex('usuario_login', 'usuario', 'login');
    }

    public function down()
    {
        $this->dropTable('usuario');
    }
}
