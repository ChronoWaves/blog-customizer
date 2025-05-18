import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleChange = (key: keyof typeof formSettings, value: OptionType) => {
		setFormSettings((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
						setIsMenuOpen(false);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>

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
								setIsMenuOpen(false);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
