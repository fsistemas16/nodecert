<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit29542b0c5f5a5709b19374b39d00b38a
{
    public static $prefixLengthsPsr4 = array (
        'm' => 
        array (
            'mikehaertl\\wkhtmlto\\' => 20,
            'mikehaertl\\tmp\\' => 15,
            'mikehaertl\\shellcommand\\' => 24,
        ),
        'L' => 
        array (
            'League\\MimeTypeDetection\\' => 25,
            'League\\Flysystem\\' => 17,
        ),
        'A' => 
        array (
            'Anam\\PhantomMagick\\' => 19,
            'Anam\\PhantomLinux\\' => 18,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'mikehaertl\\wkhtmlto\\' => 
        array (
            0 => __DIR__ . '/..' . '/mikehaertl/phpwkhtmltopdf/src',
        ),
        'mikehaertl\\tmp\\' => 
        array (
            0 => __DIR__ . '/..' . '/mikehaertl/php-tmpfile/src',
        ),
        'mikehaertl\\shellcommand\\' => 
        array (
            0 => __DIR__ . '/..' . '/mikehaertl/php-shellcommand/src',
        ),
        'League\\MimeTypeDetection\\' => 
        array (
            0 => __DIR__ . '/..' . '/league/mime-type-detection/src',
        ),
        'League\\Flysystem\\' => 
        array (
            0 => __DIR__ . '/..' . '/league/flysystem/src',
        ),
        'Anam\\PhantomMagick\\' => 
        array (
            0 => __DIR__ . '/..' . '/anam/phantommagick/src',
        ),
        'Anam\\PhantomLinux\\' => 
        array (
            0 => __DIR__ . '/..' . '/anam/phantomjs-linux-x86-binary',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit29542b0c5f5a5709b19374b39d00b38a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit29542b0c5f5a5709b19374b39d00b38a::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
