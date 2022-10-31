
export function getLogin(){

    return `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,minimum-scale=1">
		<title>Login</title>
        <!-- the form awesome library is used to add icons to our form -->
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css">
        <!-- include the stylesheet file -->
        <link href="/style.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="login">
			<h1>Login</h1>
			<form action="/auth" method="post">
				<label for="username">
					<!-- font awesome icon -->
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Username" id="username" required>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required>
				<input type="submit" value="Login">
			</form>
		</div>
	</body>
</html>`
}