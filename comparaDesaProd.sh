#!/bin/bash
# updirb desa prod | egrep -v '\.frmwkDb|\/haCap4\/|server4.properties|\.log.$' > ~/1.sh 2>&1
updirb ../../build/testing/wkf/ ../../../desaMy/wkf | egrep -v '\.bsh.$|\/archive.$|\/deltas.$' > ~/1.sh 2>&1
vi ~/1.sh
