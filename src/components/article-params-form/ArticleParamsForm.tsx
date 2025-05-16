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

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formSettings, setFormSettings] = useState(defaultArticleState);
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

	const applyStyles = (settings: typeof defaultArticleState) => {
		document
			.querySelector('main')
			?.style.setProperty('--font-family', settings.fontFamilyOption.value);
		document
			.querySelector('main')
			?.style.setProperty('--font-size', settings.fontSizeOption.value);
		document
			.querySelector('main')
			?.style.setProperty('--font-color', settings.fontColor.value);
		document
			.querySelector('main')
			?.style.setProperty('--bg-color', settings.backgroundColor.value);
		document
			.querySelector('main')
			?.style.setProperty('--container-width', settings.contentWidth.value);
	};

	const handleApply = () => {
		applyStyles(formSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		applyStyles(defaultArticleState);
		setIsOpen(false);
	};

	const handleChange = (key: keyof typeof formSettings, value: OptionType) => {
		setFormSettings((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<aside
					className={clsx(styles.container, isOpen && styles.container_open)}
					ref={asideRef}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							handleApply();
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
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
