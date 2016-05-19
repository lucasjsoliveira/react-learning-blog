<?php

namespace app\models;

use Yii;
use yii\base\Exception;
use yii\base\NotSupportedException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "usuario".
 *
 * @property integer $id
 * @property string $nome
 * @property string $login
 * @property string $senha
 */
class Usuario extends ActiveRecord implements IdentityInterface
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'usuario';
    }

    public static function validateLogin($login, $senha)
    {
        $user = self::findOne(compact('login'));

        if (is_null($user))
            return 'Usuário não encontrado';

        if ($user->senha != $senha)
            return 'Senha inválida';

        return $user;
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['nome'], 'string', 'max' => 255],
            [['login', 'senha'], 'string', 'max' => 50],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'login' => 'Login',
            'senha' => 'Senha',
        ];
    }

    /**
     * @param $plaintext
     * @param $hash
     *
     * @return bool
     * @throws \yii\base\InvalidConfigException
     */
    private function isCorrectHash($plaintext, $hash) {
        $result =  Yii::$app->security->validatePassword($plaintext, $hash);
        Yii::trace("Comparação '$plaintext' e '$hash': " . $result ? 'true' : 'false');
        return $result;
    }

    /* Implementação de IdentityInterface */

    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('Login por Token de Identidade não suportado.');
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->senha;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $authKey == $this->senha;
    }
}
