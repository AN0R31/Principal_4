<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitb113cce8fd247aaa159925ced180cb5f
{
    public static $prefixLengthsPsr4 = array (
        'V' => 
        array (
            'Valitron\\' => 9,
        ),
        'S' => 
        array (
            'Symfony\\Component\\Asset\\' => 24,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Valitron\\' => 
        array (
            0 => __DIR__ . '/..' . '/vlucas/valitron/src/Valitron',
        ),
        'Symfony\\Component\\Asset\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/asset',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitb113cce8fd247aaa159925ced180cb5f::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitb113cce8fd247aaa159925ced180cb5f::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitb113cce8fd247aaa159925ced180cb5f::$classMap;

        }, null, ClassLoader::class);
    }
}
