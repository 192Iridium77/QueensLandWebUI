export default function({$axios, redirect, $warehouse}) {
  $axios.onRequest(config => {
    if (process.browser) {
      // const _token = $warehouse.get('token');
      // config.headers.authorization = `Basic ${_token}`;
      config.baseURL = __BASE_URL;
    }
  });

  $axios.onResponse(result => {
    if (result.data.errors && result.data.errors.length) {
      const firstError = result.data.errors[0];
      const code = parseInt(firstError && firstError.status);
      if (code === 401) redirect("/login");
      if (code >= 400) throw firstError;
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) redirect("/login");
  });
}
