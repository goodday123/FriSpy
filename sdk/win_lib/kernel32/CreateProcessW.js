var hnd31;
hnd31 = Module.findExportByName("kernel32","CreateProcessW");
Interceptor.attach(hnd31, {
    onEnter: function (args) {

        var api_arguments = {};
        api_arguments.lpApplicationName = get_lpcwstr(args[0]);
        api_arguments.lpCommandLine = get_lpwstr(args[1]);
        api_arguments.lpProcessAttributes = get_lpsecurity_attributes(args[2]);
        api_arguments.lpThreadAttributes = get_lpsecurity_attributes(args[3]);
        api_arguments.bInheritHandles = get_bool(args[4]);
        api_arguments.dwCreationFlags = get_process_creation_flag(get_dword(args[5]));
        api_arguments.lpEnvironment = get_lpvoid(args[6]);
        api_arguments.lpCurrentDirectory = get_lpcwstr(args[7]);
        api_arguments.lpStartupInfo = get_lpstartupinfow(args[8]);
        api_arguments.lpProcessInformation = get_dword(args[9]);

        this.send_data = {}
        this.send_data.Date = Date()
        this.send_data.api_name = "CreateProcessW"
        this.send_data.module_name = "kernel32"
        this.send_data.api_arguments = api_arguments

    },
    onLeave: function (retval) {
        this.send_data.api_arguments.lpProcessInformation = get_lpprocess_information(this.send_data.api_arguments.lpProcessInformation);

        this.send_data.api_retval = retval
        send(JSON.stringify(this.send_data, null, 4));
    }
 });
 