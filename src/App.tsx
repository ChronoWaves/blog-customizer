import { useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [formSettings, setFormSettings] = useState(defaultArticleState);
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);

	const handleApply = () => {
		setAppliedSettings(formSettings);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		setAppliedSettings(defaultArticleState);
	};

	const styleVars: Record<string, string> = {
		'--font-family': appliedSettings.fontFamilyOption.value,
		'--font-size': appliedSettings.fontSizeOption.value,
		'--font-color': appliedSettings.fontColor.value,
		'--container-width': appliedSettings.contentWidth.value,
		'--bg-color': appliedSettings.backgroundColor.value,
	};

	return (
		<main className={styles.main} style={styleVars}>
			<ArticleParamsForm
				formSettings={formSettings}
				setFormSettings={setFormSettings}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
