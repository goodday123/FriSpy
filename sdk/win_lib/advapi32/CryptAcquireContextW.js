var hnd82;
hnd82 = Module.findExportByName("advapi32","CryptAcquireContextW");
Interceptor.attach(hnd82, {
    onEnter: function (args) {

        var api_arguments = {};
        api_arguments.phProv = get_dword(args[0]);
        api_arguments.szContainer = get_lpcwstr(args[1]);
        api_arguments.szProvider = get_lpcwstr(args[2]);
        api_arguments.dwProvType = get_crypto_provider_type(args[3]);
        api_arguments.dwFlags = get_crypto_prov_acquire_context_flag(args[4]);

        this.send_data = {}
        this.send_data.Date = Date()
        this.send_data.api_name = "CryptAcquireContextW"
        this.send_data.module_name = "advapi32"
        this.send_data.api_arguments = api_arguments

    },
    onLeave: function (retval) {
        this.send_data.api_arguments.phProv = ToHexString(get_hcryptprov(this.send_data.api_arguments.phProv));

        this.send_data.api_retval = retval
        send(JSON.stringify(this.send_data, null, 4));
    }
 });
 