from __future__ import print_function
import ctypes
import os
import platform
import sys
import threading
from collections import deque
import time
import psutil


def get_free_space_gb(dirname):
    """Return folder/drive free space (in megabytes)."""
    if platform.system() == 'Windows':
        free_bytes = ctypes.c_ulonglong(0)
        ctypes.windll.kernel32.GetDiskFreeSpaceExW(ctypes.c_wchar_p(dirname), None, None, ctypes.pointer(free_bytes))
        gigs = (float(free_bytes.value / 1024.0 / 1024.0 / 1024.0))
        return "%.2f" % round(gigs, 2)
    else:
        st = os.statvfs(dirname)
        return st.f_bavail * st.f_frsize / 1024 / 1024 / 1024


get_free_space_gb("C:\\")


def get_free_space_mb(dirname):
    """Return folder/drive free space (in megabytes)."""
    if platform.system() == 'Windows':
        free_bytes = ctypes.c_ulonglong(0)
        ctypes.windll.kernel32.GetDiskFreeSpaceExW(ctypes.c_wchar_p(dirname), None, None, ctypes.pointer(free_bytes))
        gigs = (float(free_bytes.value / 1024.0 / 1024.0))
        return "%.2f" % round(gigs, 2)
    else:
        st = os.statvfs(dirname)
        return st.f_bavail * st.f_frsize / 1024 / 1024


def get_drives():
    import os.path
    dl = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    drives = ['%s:' % d for d in dl if os.path.exists('%s:' % d)]
    free_space = 0.0
    for d in drives:
        d += '\\'
        free_space += float(get_free_space_gb(d))

    return (free_space)


get_drives()


def calc_ul_dl(rate, dt=3, interface='Ethernet'):
    t0 = time.time()
    counter = psutil.net_io_counters(pernic=True)[interface]
    print (counter)
    tot = (counter.bytes_sent, counter.bytes_recv)

    while True:
        last_tot = tot
        time.sleep(dt)
        counter = psutil.net_io_counters(pernic=True)[interface]
        t1 = time.time()
        tot = (counter.bytes_sent, counter.bytes_recv)
        ul, dl = [(now - last) / (t1 - t0) / 1000.0
                  for now, last in zip(tot, last_tot)]
        rate.append((ul, dl))
        t0 = time.time()
        return rate


def print_rate(rate):
    try:
        print('UL: {0:.0f} kB/s / DL: {1:.0f} kB/s'.format(*rate[-1]))
        return 'UL: {0:.0f} kB/s / DL: {1:.0f} kB/s'.format(*rate[-1])
    except IndexError:
        'UL: - kB/s/ DL: - kB/s'


def speedtest():
    # Create the ul/dl thread and a deque of length 1 to hold the ul/dl- values
    transfer_rate = deque(maxlen=1)
    t = threading.Thread(target=calc_ul_dl, args=(transfer_rate,))

    # The program will exit if there are only daemonic threads left.
    t.daemon = True
    t.start()
    boo = False

    # The rest of your program, emulated by me using a while True loop
    while True:
        red = print_rate(transfer_rate)
        time.sleep(5)
        red = print_rate(transfer_rate)
        boo = True
        if boo:
            numbers = [int(s) for s in red.split() if s.isdigit()]
            return numbers
