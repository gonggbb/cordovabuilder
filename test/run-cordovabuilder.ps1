param(
    [string]$ProjectPath = "C:\worksapce\pbnworkspace\front-workspace\app-docker12\cordova\",
    [string]$GradleCachePath = "C:\worksapce\pbnworkspace\front-workspace\app-docker12\cordova\gradle-caches"
)
# 生成随机容器名
$RandomId = -join ((65..90) + (97..122) | Get-Random -Count 8 | % {[char]$_})
$ContainerName = "test-server-$RandomId"

docker run -it `
  -v ${ProjectPath}:/workspace `
  -v ${GradleCachePath}:/root/.gradle `
  -v ${ProjectPath}/build-script-ln.sh:/build-script-ln.sh `
  --name $ContainerName `
  --restart=unless-stopped `
  --privileged `
  -u 0 `
  -e KEYSTORE_PATH=/workspace/newmyapp-renewed.p12 `
  -e KEY_ALIAS=myappkey `
  -e KEYSTORE_PASSWORD=123456 `
  -e KEY_PASSWORD=123456 `
  gamesg/cordovabuilder:v1.0.0-rc.6 bash /build-script-ln.sh

