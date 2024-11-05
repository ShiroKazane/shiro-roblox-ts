import type { CommandContext } from '@rbxts/centurion';
import { Command, Guard, Register } from '@rbxts/centurion';

import { isAdmin } from '../utils/is-admin';

@Register()
export class Help {
	@Command({
		name: 'help',
		description: 'List all available commands',
	})
	@Guard(isAdmin)
	public list(context: CommandContext): void {
		const parent = script.Parent;
		if (!parent) {
			return;
		}

		const commands = parent.GetChildren().filter((child) => child.IsA('ModuleScript'));
		const cmd = commands
			.filter((command) => command.Name !== 'help')
			.map((command) => `- ${command.Name}`)
			.join('<br/>');

		context.reply(`<font size="20"><b>Available commands:</b></font><br/>${cmd}`);
	}
}
