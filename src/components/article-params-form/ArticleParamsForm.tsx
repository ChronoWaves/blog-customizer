import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	formSettings: typeof defaultArticleState;
	setFormSettings: React.Dispatch<
		React.SetStateAction<typeof defaultArticleState>
	>;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	formSettings,
	setFormSettings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleChange = (key: keyof typeof formSettings, value: OptionType) => {
		setFormSettings((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<aside
					className={clsx(styles.container, styles.container_open)}
					ref={asideRef}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onApply();
							setIsOpen(false);
						}}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formSettings.fontFamilyOption}
							onChange={(value) => handleChange('fontFamilyOption', value)}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={formSettings.fontSizeOption}
							onChange={(value) => handleChange('fontSizeOption', value)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formSettings.fontColor}
							onChange={(value) => handleChange('fontColor', value)}
						/>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formSettings.backgroundColor}
							onChange={(value) => handleChange('backgroundColor', value)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formSettings.contentWidth}
							onChange={(value) => handleChange('contentWidth', value)}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={() => {
									onReset();
									setIsOpen(false);
								}}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
