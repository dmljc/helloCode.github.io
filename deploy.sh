#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'zhangfangchao.com' > CNAME

git init
git add .
git commit -m 'feat: linux gunzip -l'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
git push -f https://github.com/dmljc/helloCode.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

# 以下为张芳朝部署上线的配置
# 为了优化以上部署上线时的步骤，在 package.json 配置了一键部署
#  "deploy": "bash deploy.sh"
# 只需要执行 npm run deploy 即可实现一键部署