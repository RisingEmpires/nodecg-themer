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

	const [theme, set_theme] = useReplicant<{value: string;label: string;}>('theme', {value: 'assets/nodecg-themer/themes/default.css', label:'default'});


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
		set_theme(selectedOption)
	})

	return (
		<div className='h-24'>
			<Select className="text-black h-8 p-6" options={options} onChange={handleChange} value={theme} />
		</div>
	)
}
