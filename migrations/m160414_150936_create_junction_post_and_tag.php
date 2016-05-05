<?php

use yii\db\Migration;

class m160414_150936_create_junction_post_and_tag extends Migration
{
    public function up()
    {
        $this->createTable('post_tag', [
            'post_id' => $this->integer(),
            'tag_id' => $this->integer(),
            'PRIMARY KEY(post_id, tag_id)'
        ]);

        $this->createIndex('idx-post_tag-post_id', 'post_tag', 'post_id');
        $this->createIndex('idx-post_tag-tag_id', 'post_tag', 'tag_id');

        $this->addForeignKey('fk-post_tag-post_id', 'post_tag', 'post_id', 'post', 'id', 'CASCADE');
        $this->addForeignKey('fk-post_tag-tag_id', 'post_tag', 'tag_id', 'tag', 'id', 'CASCADE');
    }

    public function down()
    {
        $this->dropTable('post_tag');
    }
}
