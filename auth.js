(function () {
    const authSession = window.Cookies.get('auth-session');
    if (!authSession) {
        const result = confirm('Push OK button to auth');
        if (!result) {
            window.location.replace('https://google.com');
            return;
        }
        window.Cookies.set('auth-session', 'success');
    }
})()