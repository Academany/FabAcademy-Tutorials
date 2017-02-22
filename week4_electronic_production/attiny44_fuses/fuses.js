    function setHexa(low, high, extended){
        while(low.length < 2 && !$("#txtLow").is(":focus")){
            low = '0' + low;
        }
        while(high.length < 2 && !$("#txtHigh").is(":focus")){
            high = '0' + high;
        }
        while(extended.length < 2 && !$("#txtExtended").is(":focus")){
            extended = '0' + extended;
        }
        console.log(low)
        low = low.toUpperCase();
        console.log(low)
        high = high.toUpperCase();
        extended = extended.toUpperCase();
        
        $('#txtLow').val(low);
        $('#txtHigh').val(high);
        $('#txtExtended').val(extended);
        
        $('#spnLow').text(low);
        $('#spnHigh').text(high);
        $('#spnExtended').text(extended);
    }
    
    function setLowLevel(low, high, extended){
        $('#chk_CKDIV8')[0].checked = low.charAt(7) === '0';
        $('#chk_CKOUT')[0].checked = low.charAt(6) === '0';
        $('#chk_SUT1')[0].checked = low.charAt(5) === '0';
        $('#chk_SUT0')[0].checked = low.charAt(4) === '0';
        $('#chk_CKSEL3')[0].checked = low.charAt(3) === '0';
        $('#chk_CKSEL2')[0].checked = low.charAt(2) === '0';
        $('#chk_CKSEL1')[0].checked = low.charAt(1) === '0';
        $('#chk_CKSEL0')[0].checked = low.charAt(0) === '0';
        
        $('#chk_RSTDISBL')[0].checked = high.charAt(7) === '0';
        $('#chk_DWEN')[0].checked = high.charAt(6) === '0';
        $('#chk_SPIEN')[0].checked = high.charAt(5) === '0';
        $('#chk_WDTON')[0].checked = high.charAt(4) === '0';
        $('#chk_EESAVE')[0].checked = high.charAt(3) === '0';
        $('#chk_BODLEVEL2')[0].checked = high.charAt(2) === '0';
        $('#chk_BODLEVEL1')[0].checked = high.charAt(1) === '0';
        $('#chk_BODLEVEL0')[0].checked = high.charAt(0) === '0';
        
        $('#chk_SELFPRGEN')[0].checked = extended.charAt(0) === '0';
    }
    
    function setHighLevel(low, high, extended){
        $('#chk_CKDIV8_H')[0].checked = low.charAt(7) === '0';
        $('#chk_CKOUT_H')[0].checked = low.charAt(6) === '0';
        $('#chk_RSTDISBL_H')[0].checked = high.charAt(7) === '0';
        $('#chk_DWEN_H')[0].checked = high.charAt(6) === '0';
        $('#chk_SPIEN_H')[0].checked = high.charAt(5) === '0';
        $('#chk_WDTON_H')[0].checked = high.charAt(4) === '0';
        $('#chk_EESAVE_H')[0].checked = high.charAt(3) === '0';
        $('#chk_SELFPRGEN_H')[0].checked = extended.charAt(0) === '0';
        
        bod = high.charAt(2) +high.charAt(1) + high.charAt(0);
        $('#ddl_BOD').val(bod);
        
        clock = low.charAt(3) + low.charAt(2) + low.charAt(1) + low.charAt(0) + '-' + low.charAt(5) + low.charAt(4);
        $('#ddl_CLOCK').val(clock);
    }
    
    function set(low, high, extended){
        setHexa(low, high, extended);
        
        low = Hex2Bin(low);
        high = Hex2Bin(high);
        extended = Hex2Bin(extended);
        
        setLowLevel(low, high, extended);
        setHighLevel(low, high, extended);
    }
    
    function setFromLow(low, high, extended){
        setHexa(low, high, extended);
        
        low = Hex2Bin(low);
        high = Hex2Bin(high);
        extended = Hex2Bin(extended);
        
        setLowLevel(low, high, extended);
        setHighLevel(low, high, extended);
    }
    
    function hexaChanged(){
        low = $('#txtLow').val();
        high = $('#txtHigh').val();
        extended = $('#txtExtended').val();
        
        if(!/^[0-9A-Fa-f]{1,64}$/.test(low)){
            $('#txtLow').addClass('error');
            return;
        }else{
            $('#txtLow').removeClass('error');
        }
        
        if(!/^[0-9A-Fa-f]{1,64}$/.test(high)){
            $('#txtHigh').addClass('error');
            return;
        }else{
            $('#txtHigh').removeClass('error');
        }
        
        if(!/^[0-9A-Fa-f]{1,64}$/.test(extended)){
            $('#txtExtended').addClass('error');
            return;
        }else{
            $('#txtExtended').removeClass('error');
        }
        set(low, high, extended);
    }
    
    function programmed(id){
        return ($(id)[0].checked) ? 0 : 1;
    }
    
    function lowLevelChanged(){
        low = '' + programmed('#chk_CKDIV8') + programmed('#chk_CKOUT') + programmed('#chk_SUT1') + programmed('#chk_SUT0') + programmed('#chk_CKSEL3') + programmed('#chk_CKSEL2') + programmed('#chk_CKSEL1') + programmed('#chk_CKSEL0');
        low = Bin2Hex(low);
        high = '' + programmed('#chk_RSTDISBL') + programmed('#chk_DWEN') + programmed('#chk_SPIEN') + programmed('#chk_WDTON') + programmed('#chk_EESAVE') + programmed('#chk_BODLEVEL2') + programmed('#chk_BODLEVEL1') + programmed('#chk_BODLEVEL0');
        high = Bin2Hex(high);
        extended = '1111111' + programmed('#chk_SELFPRGEN');
        extended = Bin2Hex(extended);
        
        set(low, high, extended);
    }
    
    
    function highLevelChanged(){
        arr = $('#ddl_CLOCK').val().split('-');
        sut = arr[1];
        cksel = arr[0];
        low = '' + programmed('#chk_CKDIV8_H') + programmed('#chk_CKOUT_H') + sut + cksel;
        low = Bin2Hex(low);
        high = '' + programmed('#chk_RSTDISBL_H') + programmed('#chk_DWEN_H') + programmed('#chk_SPIEN_H') + programmed('#chk_WDTON_H') + programmed('#chk_EESAVE_H') + $('#ddl_BOD').val();
        high = Bin2Hex(high);
        extended = '1111111' + programmed('#chk_SELFPRGEN_H');
        extended = Bin2Hex(extended);
        
        set(low, high, extended);
    }
    
    function Bin2Hex(n){
        return parseInt(n,2).toString(16)
    }
    
    function Hex2Bin(n){
        if(!/^[0-9A-Fa-f]{1,64}$/.test(n)){
            return 0;
        }
        b = parseInt(n,16).toString(2)
        while(b.length < 8){
            b = '0' + b;
        }
        b = b.split('').reverse().join('')
        return b;
    }
    
    hexaChanged();
