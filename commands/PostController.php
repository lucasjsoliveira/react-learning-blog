<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 16/05/16
 * Time: 13:35
 */

namespace app\commands;


use app\models\Post;
use app\models\PostTag;
use app\models\Tag;
use Faker\Factory;
use yii\console\Controller;
use yii\db\Query;

class PostController extends Controller
{
    public function actionCreate($quant = 1, $tags = true)
    {
        $this->stdout("Gerando $quant posts.\n");
        $gen = Factory::create();

        $tag_ids = null;

        if ($tags)
            $tag_ids = (new Query())->select('id')->from('tag')->all();

        for($c = 0; $c < $quant; $c++) {
            $post = new Post();
            $post->titulo = $gen->sentence(5);
            $post->corpo = $gen->paragraph(10);
            $post->autor = $gen->name;
            $post->data = $gen->dateTimeBetween('-1 year')->format('Y-m-d');
            $post->save();

            if (!$tags)
                continue;
            
            $total_tags = count($tag_ids);
            $pos = random_int(0, $total_tags - 1);
            $rel = new PostTag();
            $rel->post_id = $post->id;
            $rel->tag_id = $tag_ids[$pos]['id'];
            $rel->save();
        }
    }

    public function actionCreateTags($quant = 1)
    {
        $this->stdout("Gerando $quant tags.\n");
        $gen = Factory::create();
        for($c = 0; $c < $quant; $c++) {
            $tag = new Tag();
            $tag->tag = $gen->word;
            $tag->save();
        }
    }
}