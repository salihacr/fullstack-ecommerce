import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
    return (
        <FormControl component='fieldset'>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {options.map(({ label, value }) => (
                    <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}