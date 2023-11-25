import React, { useEffect, useState } from 'react';
import { useReplicant } from 'use-nodecg';
import Select, { type SingleValue } from 'react-select';
import { NodeCG } from '@nodecg/types/types/nodecg';

interface DropdownOption {
	value: string;
	label: string;
}

export function NodeCgThemer() {

	const [options, set_options] = useState<DropdownOption[]>([]);
	const [themes, set_themes] = useReplicant<NodeCG.AssetFile[]>('assets:themes', []);

	const [newTheme, set_newTheme] = useState<any>()

	const [theme, set_theme] = useReplicant<{ value: string; label: string; }>('theme', { value: 'assets/nodecg-themer/themes/default.css', label: 'default' });


	// Set the options in the dropdown menu to avaliable civs from /assets/aoe4-civ-draft/civ
	useEffect(() => {
		if (themes.length === 0) return;
		const _array: typeof options = [];
		themes.forEach((element) => {
			let { name } = element;
			name = name.replace(/_/g, ' ');
			_array.push({ value: element?.url, label: name });
		});
		_array.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
		set_options(_array);
	}, [themes]);

	const handleChange = (selectedOption => {
		set_newTheme(selectedOption)
	})

	//@ts-ignore
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("new shiny theme")
		set_theme(newTheme)
	}

	return (
		<div className='h-24 p-6 flex flex-row justify-center align-middle'>
			<Select className="text-black h-8 w-2/3 px-8 py-2" options={options} defaultValue={theme} onChange={handleChange} />
			<button className='bg-green-500 hover:bg-green-700 w-1/3 items-center' onClick={handleSubmit}>Apply Theme</button>
		</div>
	)
}
