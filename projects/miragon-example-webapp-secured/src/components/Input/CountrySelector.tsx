import React, {ChangeEvent, useCallback} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputAdornment} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    flagAdornment: {
        marginLeft: "7px",
        marginRight: "0px"
    }
})

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
const getFlagOfCountry = (isoCode: string): string => {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g,
            (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const getCodeForSelectedCountry = (value: string): string => {
    const selectedCountry = countries.find(country => country.label === value);
    return selectedCountry !== undefined ? selectedCountry.code : ""
}

const getSelectedCountry = (value: string): CountryType | undefined => {
    const selectedCountry = countries.find(country => country.label === value);
    return selectedCountry ? selectedCountry : countries[0];
}

const getSelectOption = (country: CountryType): string => {
    return `${getFlagOfCountry(country.code)} ${country.label} ${country.code !== "" ? `(${country.code})` : ""}`
}

interface CountryType {
    code: string;
    label: string;
}

interface CountrySelectorProps {
    className: string,
    required?: boolean,
    label: string,
    value: string,
    fullWidth: boolean,
    disabled: boolean,
    variant: 'standard' | 'outlined',
    size: 'small' | 'medium',
    onChangeCountry(selectedCountry: string): void,
}

const CountrySelector: React.FC<CountrySelectorProps> = (props: CountrySelectorProps) => {
    const classes = useStyles();

    const changeCountry = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        const country = getSelectedCountry(event.target.value);
        country && country.code !== "" ? props.onChangeCountry(country.label) : props.onChangeCountry("");
    }, [props]);

    return (
        <Autocomplete
            fullWidth
            options={countries as CountryType[]}
            getOptionLabel={(option) => option.label}
            onSelect={changeCountry}
            disableClearable={true}
            value={getSelectedCountry(props.value)}
            renderOption={(option) => (
                <React.Fragment>
                    <span>{getSelectOption(option)}</span>
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required={props.required}
                    disabled={props.disabled}
                    fullWidth={props.fullWidth}
                    className={props.className}
                    label={props.label}
                    size={props.size}
                    variant={props.variant}
                    value={props.value}
                    InputProps={{
                        ...params.InputProps,
                        value: props.value,
                        startAdornment: (
                            <InputAdornment className={classes.flagAdornment} position="start">
                                <div>{getFlagOfCountry(getCodeForSelectedCountry(props.value))}</div>
                            </InputAdornment>
                        ),
                    }}
                    onChange={changeCountry}/>
            )}/>
    );
}

export default CountrySelector;

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries: CountryType[] = [
    {code: "", label: "Keine Auswahl"},
    {code: "AD", label: "Andorra"},
    {code: "AE", label: "Vereinigte Arabische Emirate"},
    {code: "AF", label: "Afghanistan"},
    {code: "AG", label: "Antigua und Barbuda"},
    {code: "AI", label: "Anguilla"},
    {code: "AL", label: "Albanien"},
    {code: "AM", label: "Armenien"},
    {code: "AO", label: "Angola"},
    {code: "AQ", label: "Antarktis"},
    {code: "AR", label: "Argentinien"},
    {code: "AS", label: "Amerikanisch-Samoa"},
    {code: "AT", label: "Österreich"},
    {code: "AU", label: "Australien"},
    {code: "AW", label: "Aruba"},
    {code: "AX", label: "Åland"},
    {code: "AZ", label: "Aserbaidschan"},
    {code: "BA", label: "Bosnien und Herzegowina"},
    {code: "BB", label: "Barbados"},
    {code: "BD", label: "Bangladesch"},
    {code: "BE", label: "Belgien"},
    {code: "BF", label: "Burkina Faso"},
    {code: "BG", label: "Bulgarien"},
    {code: "BH", label: "Bahrain"},
    {code: "BI", label: "Burundi"},
    {code: "BJ", label: "Benin"},
    {code: "BL", label: "Saint-Barthélemy"},
    {code: "BM", label: "Bermuda"},
    {code: "BN", label: "Brunei Darussalam"},
    {code: "BO", label: "Bolivien"},
    {code: "BQ", label: "Bonaire"},
    {code: "BR", label: "Brasilien"},
    {code: "BS", label: "Bahamas"},
    {code: "BT", label: "Bhutan"},
    {code: "BV", label: "Bouvetinsel"},
    {code: "BW", label: "Botswana"},
    {code: "BY", label: "Weißrussland"},
    {code: "BZ", label: "Belize"},
    {code: "CA", label: "Kanada"},
    {code: "CC", label: "Kokosinseln"},
    {code: "CD", label: "Kongo"},
    {code: "CF", label: "Zentralafrikanische Republik"},
    {code: "CG", label: "Republik Kongo"},
    {code: "CH", label: "Schweiz"},
    {code: "CI", label: "Elfenbeinküste"},
    {code: "CK", label: "Cookinseln"},
    {code: "CL", label: "Chile"},
    {code: "CM", label: "Kamerun"},
    {code: "CN", label: "China"},
    {code: "CO", label: "Kolumbien"},
    {code: "CR", label: "Costa Rica"},
    {code: "CU", label: "Kuba"},
    {code: "CV", label: "Kap Verde"},
    {code: "CW", label: "Curaçao"},
    {code: "CX", label: "Weihnachtsinsel"},
    {code: "CY", label: "Zypern"},
    {code: "CZ", label: "Tschechische Republik"},
    {code: "DE", label: "Deutschland"},
    {code: "DJ", label: "Dschibuti"},
    {code: "DK", label: "Dänemark"},
    {code: "DM", label: "Dominica"},
    {code: "DO", label: "Dominikanische Republik"},
    {code: "DZ", label: "Algerien"},
    {code: "EC", label: "Ecuador"},
    {code: "EE", label: "Estland"},
    {code: "EG", label: "Ägypten"},
    {code: "EH", label: "Westsahara"},
    {code: "ER", label: "Eritrea"},
    {code: "ES", label: "Spanien"},
    {code: "ET", label: "Äthiopien"},
    {code: "FI", label: "Finnland"},
    {code: "FJ", label: "Fidschi"},
    {code: "FK", label: "Falklandinseln"},
    {code: "FM", label: "Mikronesien"},
    {code: "FO", label: "Färöer"},
    {code: "FR", label: "Frankreich"},
    {code: "GA", label: "Gabun"},
    {code: "GB", label: "Vereinigtes Königreich"},
    {code: "GD", label: "Grenada"},
    {code: "GE", label: "Georgien"},
    {code: "GF", label: "Französisch-Guayana"},
    {code: "GG", label: "Guernsey"},
    {code: "GH", label: "Ghana"},
    {code: "GI", label: "Gibraltar"},
    {code: "GL", label: "Grönland"},
    {code: "GM", label: "Gambia"},
    {code: "GN", label: "Guinea"},
    {code: "GP", label: "Guadeloupe"},
    {code: "GQ", label: "Äquatorialguinea"},
    {code: "GR", label: "Griechenland"},
    {code: "GS", label: "Südgeorgien und die Südlichen Sandwichinseln"},
    {code: "GT", label: "Guatemala"},
    {code: "GU", label: "Guam"},
    {code: "GW", label: "Guinea-Bissau"},
    {code: "GY", label: "Guyana"},
    {code: "HK", label: "Hongkong"},
    {code: "HM", label: "Heard und McDonaldinseln"},
    {code: "HN", label: "Honduras"},
    {code: "HR", label: "Kroatien"},
    {code: "HT", label: "Haiti"},
    {code: "HU", label: "Ungarn"},
    {code: "ID", label: "Indonesien"},
    {code: "IE", label: "Irland"},
    {code: "IL", label: "Israel"},
    {code: "IM", label: "Insel Man"},
    {code: "IN", label: "Indien"},
    {code: "IO", label: "Britisches Territorium im Indischen Ozean"},
    {code: "IQ", label: "Irak"},
    {code: "IR", label: "Iran"},
    {code: "IS", label: "Island"},
    {code: "IT", label: "Italien"},
    {code: "JE", label: "Jersey"},
    {code: "JM", label: "Jamaika"},
    {code: "JO", label: "Jordanien"},
    {code: "JP", label: "Japan"},
    {code: "KE", label: "Kenia"},
    {code: "KG", label: "Kirgisistan"},
    {code: "KH", label: "Kambodscha"},
    {code: "KI", label: "Kiribati"},
    {code: "KM", label: "Komoren"},
    {code: "KN", label: "St. Kitts und Nevis"},
    {code: "KP", label: "Nordkorea"},
    {code: "KR", label: "Südkorea"},
    {code: "KW", label: "Kuwait"},
    {code: "KY", label: "Kaimaninseln"},
    {code: "KZ", label: "Kasachstan"},
    {code: "LA", label: "Laos"},
    {code: "LB", label: "Libanon"},
    {code: "LC", label: "St. Lucia"},
    {code: "LI", label: "Liechtenstein"},
    {code: "LK", label: "Sri Lanka"},
    {code: "LR", label: "Liberia"},
    {code: "LS", label: "Lesotho"},
    {code: "LT", label: "Litauen"},
    {code: "LU", label: "Luxemburg"},
    {code: "LV", label: "Lettland"},
    {code: "LY", label: "Libyen"},
    {code: "MA", label: "Marokko"},
    {code: "MC", label: "Monaco"},
    {code: "MD", label: "Moldawien"},
    {code: "ME", label: "Montenegro"},
    {code: "MF", label: "Saint-Martin"},
    {code: "MG", label: "Madagaskar"},
    {code: "MH", label: "Marshallinseln"},
    {code: "MK", label: "Nordmazedonien"},
    {code: "ML", label: "Mali"},
    {code: "MM", label: "Myanmar"},
    {code: "MN", label: "Mongolei"},
    {code: "MO", label: "Macao"},
    {code: "MP", label: "Nördliche Marianen"},
    {code: "MQ", label: "Martinique"},
    {code: "MR", label: "Mauretanien"},
    {code: "MS", label: "Montserrat"},
    {code: "MT", label: "Malta"},
    {code: "MU", label: "Mauritius"},
    {code: "MV", label: "Malediven"},
    {code: "MW", label: "Malawi"},
    {code: "MX", label: "Mexiko"},
    {code: "MY", label: "Malaysia"},
    {code: "MZ", label: "Mosambik"},
    {code: "NA", label: "Namibia"},
    {code: "NC", label: "Neukaledonien"},
    {code: "NE", label: "Niger"},
    {code: "NF", label: "Norfolkinsel"},
    {code: "NG", label: "Nigeria"},
    {code: "NI", label: "Nicaragua"},
    {code: "NL", label: "Niederlande"},
    {code: "NO", label: "Norwegen"},
    {code: "NP", label: "Nepal"},
    {code: "NR", label: "Nauru"},
    {code: "NU", label: "Niue"},
    {code: "NZ", label: "Neuseeland"},
    {code: "OM", label: "Oman"},
    {code: "PA", label: "Panama"},
    {code: "PE", label: "Peru"},
    {code: "PF", label: "Französisch-Polynesien"},
    {code: "PG", label: "Papua-Neuguinea"},
    {code: "PH", label: "Philippinen"},
    {code: "PK", label: "Pakistan"},
    {code: "PL", label: "Polen"},
    {code: "PM", label: "Saint-Pierre und Miquelon"},
    {code: "PN", label: "Pitcairninseln"},
    {code: "PR", label: "Puerto Rico"},
    {code: "PS", label: "Staat Palästina"},
    {code: "PT", label: "Portugal"},
    {code: "PW", label: "Palau"},
    {code: "PY", label: "Paraguay"},
    {code: "QA", label: "Katar"},
    {code: "RE", label: "Réunion"},
    {code: "RO", label: "Rumänien"},
    {code: "RS", label: "Serbien"},
    {code: "RU", label: "Russische Föderation"},
    {code: "RW", label: "Ruanda"},
    {code: "SA", label: "Saudi-Arabien"},
    {code: "SB", label: "Salomonen"},
    {code: "SC", label: "Seychellen"},
    {code: "SD", label: "Sudan"},
    {code: "SE", label: "Schweden"},
    {code: "SG", label: "Singapur"},
    {code: "SH", label: "St. Helena"},
    {code: "SI", label: "Slowenien"},
    {code: "SJ", label: "Svalbard und Jan Mayen"},
    {code: "SK", label: "Slowakei"},
    {code: "SL", label: "Sierra Leone"},
    {code: "SM", label: "San Marino"},
    {code: "SN", label: "Senegal"},
    {code: "SO", label: "Somalia"},
    {code: "SR", label: "Suriname"},
    {code: "SS", label: "Südsudan"},
    {code: "ST", label: "São Tomé und Príncipe"},
    {code: "SV", label: "El Salvador"},
    {code: "SX", label: "Sint Maarten"},
    {code: "SY", label: "Syrien"},
    {code: "SZ", label: "Swasiland"},
    {code: "TC", label: "Turks- und Caicosinseln"},
    {code: "TD", label: "Tschad"},
    {code: "TF", label: "Französische Süd- und Antarktisgebiete"},
    {code: "TG", label: "Togo"},
    {code: "TH", label: "Thailand"},
    {code: "TJ", label: "Tadschikistan"},
    {code: "TK", label: "Tokelau"},
    {code: "TL", label: "Osttimor"},
    {code: "TM", label: "Turkmenistan"},
    {code: "TN", label: "Tunesien"},
    {code: "TO", label: "Tonga"},
    {code: "TR", label: "Türkei"},
    {code: "TT", label: "Trinidad und Tobago"},
    {code: "TV", label: "Tuvalu"},
    {code: "TW", label: "Taiwan"},
    {code: "TZ", label: "Tansania"},
    {code: "UA", label: "Ukraine"},
    {code: "UG", label: "Uganda"},
    {code: "UM", label: "United States Minor Outlying Islands"},
    {code: "US", label: "Vereinigte Staaten von Amerika"},
    {code: "UY", label: "Uruguay"},
    {code: "UZ", label: "Usbekistan"},
    {code: "VA", label: "Vatikanstadt"},
    {code: "VC", label: "St. Vincent und die Grenadinen"},
    {code: "VE", label: "Venezuela"},
    {code: "VG", label: "Britische Jungferninseln"},
    {code: "VI", label: "Amerikanische Jungferninseln"},
    {code: "VN", label: "Vietnam"},
    {code: "VU", label: "Vanuatu"},
    {code: "WF", label: "Wallis und Futuna"},
    {code: "WS", label: "Samoa"},
    {code: "XK", label: "Kosovo"},
    {code: "YE", label: "Jemen"},
    {code: "YT", label: "Mayotte"},
    {code: "ZA", label: "Südafrika"},
    {code: "ZM", label: "Sambia"},
    {code: "ZW", label: "Simbabwe"},
];
