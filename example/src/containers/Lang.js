import React from 'react';
import { Text } from "../components/kit";
import { languages } from "../localization";

export default function Lang(props) {
  const { language } = props;

  const [selectedLanguage, setLanguage] = React.useState(JSON.stringify(language));

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <Text type="span">lang</Text>
      <br />
      <select value={selectedLanguage} onChange={handleChange}>
        {Object.values(languages).map(language => <option value={JSON.stringify(language)}>{language.value}</option>)}
      </select>
    </div>
  );
}
