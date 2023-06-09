// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "various-snippets" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('various-snippets.copyContent', async function () {
		// The code you place here will be executed every time your command is executed

		// Read the content of 'content.hex' in the extension's folder
		const contentPath = path.join(context.extensionPath, 'content.hex');
		const hexContent = await fs.promises.readFile(contentPath, 'utf8');

		// Get the currently opened folder
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (workspaceFolders && workspaceFolders.length > 0) {
			const targetPath = path.join(workspaceFolders[0].uri.fsPath, 'content.hex');
			await fs.promises.writeFile(targetPath, hexContent);

			// Display a message box to the user
			vscode.window.showInformationMessage('Content.hex copied to the current folder!');
		} else {
			vscode.window.showErrorMessage('No folder is currently opened.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
