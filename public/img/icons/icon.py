## 引入的 外部包文件  需要 python3+  使用 pip3 install Image
from PIL import Image
import os

## 需要新增文件尺寸的文件位置根目录(新项目 需要自行修改)  该目录下您必须包含两个文件(icon_1024.png 和 safari-pinned-tab.svg)
imageDir = 'E:/workspace/ncysgc-web/public/img/icons/'

## 由于框架集成了 icon 集合，需要一键生成 icon 会生成 png文件
## 但是 名字为  safari-pinned-tab.svg 文件 需要  绘制矢量 svg 16*16

imageSize = [
    {
        'name': 'android-chrome-192x192',
        'size': 192
    },
    {
        'name': 'android-chrome-512x512',
        'size': 512
    },
    {
        'name': 'apple-touch-icon',
        'size': 180
    },
    {
        'name': 'apple-touch-icon-60x60',
        'size': 60
    },
    {
        'name': 'apple-touch-icon-76x76',
        'size': 76
    },
    {
        'name': 'apple-touch-icon-120x120',
        'size': 120
    },
    {
        'name': 'apple-touch-icon-152x152',
        'size': 152
    },
    {
        'name': 'apple-touch-icon-180x180',
        'size': 180
    },
    {
        'name': 'favicon-16x16',
        'size': 16
    },
    {
        'name': 'favicon-32x32',
        'size': 32
    },
    {
        'name': 'msapplication-icon-144x144',
        'size': 144
    },
    {
        'name': 'mstile-150x150',
        'size': 150
    }

]


def createImage(obj):
        im = Image.open(imageDir + "\icon_1024.png")
        im.resize((obj['size'], obj['size']), Image.ANTIALIAS).save(imageDir + "%s.png" % obj['name'])

def start():

    if(not os.path.exists(imageDir + "\icon_1024.png")):
        print("您当前没有名字为 \'icon_1024.png\'的文件,请绘制一个该尺寸的图片")
        return

    for obj in imageSize:
        createImage(obj)


if __name__ == "__main__":
    start()
