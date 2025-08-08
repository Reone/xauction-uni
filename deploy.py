# -*- coding: utf-8 -*-

import paramiko
import os
import shutil
import subprocess

# 准备上传的目录名
dir_name = "dist/build/h5"
tar_name = "xauction"
# 目标远程目录
remote_dir = "/home/html/"

# 本地文件夹路径
local_folder_path = "./{}/".format(dir_name)
# 压缩后的文件路径
archive_file_path = "./{}.tar.gz".format(tar_name)
# 远程服务器信息
remote_user = "root"
remote_host = "58.87.80.62"

# 压缩本地文件夹
shutil.make_archive(tar_name, "gztar", local_folder_path)

# 创建SSH客户端
ssh_client = paramiko.SSHClient()
ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    # 连接远程服务器
    ssh_client.connect(hostname=remote_host, username=remote_user)

    # 创建SFTP客户端
    sftp_client = ssh_client.open_sftp()

    # 上传本地压缩文件到远程服务器
    sftp_client.put(archive_file_path, os.path.join(remote_dir, "{}.tar.gz".format(tar_name)))

    # 关闭SFTP客户端连接
    sftp_client.close()

    print("sftp upload successfully")

    # 执行远程命令解压文件
    stdin, stdout, stderr = ssh_client.exec_command("cd {} && rm -rf {} && mkdir {} && tar -xzvf {}.tar.gz -C {}".format(remote_dir, tar_name, tar_name, tar_name, tar_name))
    print(stdout.read().decode())

    print("tar successfully")
finally:
    # 关闭SSH客户端连接
    ssh_client.close()
    # 清理本地临时文件
    os.remove(archive_file_path)

# 构建ssh前缀
ssh_pre = "ssh {}@{}".format(remote_user, remote_host)

print("deploy successfully.")
