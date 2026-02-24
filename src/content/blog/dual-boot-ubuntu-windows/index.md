---
title: "How to Dual-Boot Ubuntu and Windows 11"
description: "Step-by-step guide to set up a dual-boot system with Windows 11 and Ubuntu, including a shared NTFS partition."
date: "Jan 4, 2024"
tags: ["Linux", "Windows", "Tutorial"]
---
A dual-boot setup lets you keep Windows and a Linux distribution on the same machine, switching between them at boot. This guide covers every step to install Ubuntu alongside an existing Windows 11 installation.

## Prerequisites

Before starting, make sure you have:

- Windows 11 already installed
- A PC with UEFI BIOS (not Legacy/CSM)
- An 8 GB USB drive you can erase
- An internet connection

### Verify UEFI mode

Search for "System Information" in Windows and check the **BIOS Mode** field. It should read **UEFI**.

## Prepare the environment

### Create a partition for Ubuntu

Open Disk Management in Windows and shrink your main partition to free up the space you want to give Ubuntu (32 GB minimum recommended). Leave the freed space unallocated.

### Create a bootable USB drive

1. Download the Ubuntu ISO from the [Ubuntu website](https://ubuntu.com/download/desktop).
2. Download [Rufus](https://rufus.ie/).
3. Open Rufus, select your USB drive, load the ISO, and flash it. Keep the default GPT partition scheme for UEFI.

## Install Ubuntu

Restart the PC and enter the BIOS (common keys: F12, F10, Delete, or Escape). Set the USB drive as the first boot device and save.

The PC will boot into the Ubuntu installer. Follow the prompts until you reach **Installation type**, then choose **Something else**.

### Partition layout

Select the free (unallocated) space you created earlier and set up two partitions:

1. **Swap** — 2048 MB, primary, used as swap area.
2. **Root** — remaining space, primary, format `ext4`, mount point `/`.

Continue with the installation and let it finish.

## Set up a shared folder

If you want to share files between Windows and Ubuntu, create an NTFS partition that both systems can read and write.

### Steps

1. In Ubuntu, install GParted if it is not already available.
2. Create a new NTFS partition from the unallocated space (or shrink an existing one).
3. Mount the partition:

```bash
sudo mount -t ntfs -o rw /dev/<partition> /path/to/mountpoint/
```

4. If you run into permission errors on the mounted folder:

```bash
sudo chmod -R 777 /path/to/mountpoint/
```

To mount the partition automatically on boot, add an entry to `/etc/fstab`.

## Conclusions

After following these steps you will have a working dual-boot system with Windows 11 and Ubuntu. At startup, GRUB will let you choose which OS to boot into. The optional shared NTFS partition gives both systems access to the same files without copying anything.
