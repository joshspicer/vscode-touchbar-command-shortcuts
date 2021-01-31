// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Activating Touchbar Command Shortcuts...');

	var keys = ["first", "second", "third"];
	keys.forEach(item => {
		console.log(`Setting up ${item}`);
		var cmdValue = vscode.workspace.getConfiguration('touchbarcommandshortcuts').get(`${item}Cmd`);

		if (!cmdValue) {
			console.warn(`${item}Cmd has not been defined in settings. Add to settings and reload VSCode to enable.`);
			vscode.commands.executeCommand('setContext', `touchbarcommandshortcuts:${item}Enabled`, false);	
			return;
			
		} else {
			console.log(`Settings for ${item}Cmd is set to ${cmdValue}`);
			vscode.commands.executeCommand('setContext', `touchbarcommandshortcuts:${item}Enabled`, true);

			let registeredCommandDisposable = vscode.commands.registerCommand(`touchbarcommandshortcuts.${item}`, () => vscode.commands.executeCommand(cmdValue as string));
			context.subscriptions.push(registeredCommandDisposable);
		} 	 
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
