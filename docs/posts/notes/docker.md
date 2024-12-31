---
title: 云原生
date: 2024-12-31
---

## 判断是否为容器

```sh
cat /proc/1/cgroup | grep -qi docker && echo "Is Docker" || echo "Not Docker"
```

> [!NOTE]
>
> `/proc/1/cgroup`文件包含了关于 init 进程（进程 ID 为 1）的控制组信息。在 Docker 容器中，这个文件通常会包含与 Docker 相关的控制组路径信息。

## 容器逃逸介绍

### 主要方法

#### 1、不安全的配置

1. 判断特权模式

    ```sh
    cat /proc/self/status | grep -qi "0000003fffffffff" && echo "Is privileged mode" || echo "Not privileged mode"
    ```

    > [!TIP]
    >
    > `/proc/self`运行的进程，可能是特权模式进程下会出现的某个特殊字符串

2. 挂载Docker Socket

    ```sh
    ls /var/run/ | grep -qi docker.sock && echo "Docker Socket is mounted." || echo "Docker Socket is not mounted."
    ```

    > [!NOTE]
    >
    > `/var/run/`存放进程运行相关的临时文件

3. 挂载procfs(进程文件系统)

    ```sh
    find / -name core_pattern 2>/dev/null | wc -l | grep -q 2 && echo "Procfs is mounted." || echo "Procfs is not mounted."
    ```

    > [!NOTE]
    >
    > 查找包含`core_pattern`文件，通过文件数判断是否挂载

4. 挂载宿主机目录

    ```sh
    find / -name passwd 2>/dev/null | grep /etc/passwd | wc -l | grep -q 7 && echo "Root directory is mounted." || echo "Root directory is not mounted."
    ```

    > [!WARNING]
    >
    > 这里无法理解，因为`/etc/passwd`文件数量无法具体判断

5. Docker remote api未授权访问

    ```sh
    IP=`hostname -i | awk -F. '{print $1 "." $2 "." $3 ".1"}' ` && timeout 3 bash -c "echo >/dev/tcp/$IP/2375" > /dev/null 2>&1 && echo "Docker Remote API Is Enabled." || echo "Docker Remote API is Closed."
    ```

    > [!NOTE]
    >
    > `bash -c "echo >/dev/tcp/$IP/2375"`通过TCP连接到指定的IP地址和2375端口，并发送一个空的输出。
    >
    >  2375为默认Docker守护进程监听TCP Socket端口

#### 2、相关程序漏洞

#### 3、内核漏洞

1. CVE-2016-5195 DirtyCow 逃逸

    执行 uname -r 命令，如果在 2.6.22 <= 版本 <= 4.8.3 之间说明可能存在 CVE-2016-5195 DirtyCow 漏洞。

2. CVE-2020-14386

    执行 uname -r 命令，如果在 4.6 <= 版本 < 5.9 之间说明可能存在 CVE-2020-14386 漏洞。

3. CVE-2022-0847 DirtyPipe 逃逸

    执行 uname -r 命令，如果在 5.8 <= 版本 < 5.10.102 < 版本 < 5.15.25 < 版本 < 5.16.11 之间说明可能存在 CVE-2022-0847 DirtyPipe 漏洞。

