// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useAxios } from 'utils/axios'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

type State = {
  id: number | null;
  company: string | null;
  company_number: string | null;
  company_vat: string | null;
  birthday: Date | null | undefined;
  document_nr: string | null;
  gender: string | null
};

const TabInfo = ({ token }) => {
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null)

  const [values, setValues] = useState<State>({
    id: token,
    birthday: date,
    company: '',
    company_number: '',
    company_vat: '',
    document_nr: '',
    gender: 'male'
  });

  const [axios, spinner] = useAxios();

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(async () => {
    await axios.get(`/api/client/?id=${token}&field=id&field=company&field=company_number&field=company_vat&field=document_nr&field=gender&field=birthday`)
    .then(({ data }) => {
      if(data.status === 200){
        setValues(data.data)
        setDate(new Date(data.data.birthday))
      }
      else{
        alert("There was an error in fetching your details.")
        window.location.href = '/dashboard'
      }
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let birthday = date
    const offset = birthday.getTimezoneOffset()
    birthday = new Date(birthday.getTime() - (offset*60*1000))
    const data  = {...values, birthday: birthday.toISOString().split('T')[0]}
    await axios.post('/api/update', data)
      .then(({data}) => {
        if(data.status === 200){
          alert("Account details updated successfully.")
        }
        else{
          alert("Failed to update account details")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <CardContent>
      {spinner}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='YYYY-MM-DD'
                dateFormat='yyyy-MM-dd'
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
                autoFocus 
                fullWidth 
                type="number"
                id='company' 
                label='Company Number' 
                sx={{ marginBottom: 4 }} 
                value={values.company_number}
                onChange={handleChange('company_number')}
                />
          </Grid>
          <Grid item xs={12} md={6}>
                <TextField 
                autoFocus 
                fullWidth 
                id='company' 
                label='Company Name' 
                sx={{ marginBottom: 4 }} 
                value={values.company}
                onChange={handleChange('company')}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
                autoFocus 
                fullWidth 
                id='company_vat' 
                label='Company VAT' 
                sx={{ marginBottom: 4 }} 
                value={values.company_vat}
                onChange={handleChange('company_vat')}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
                autoFocus 
                fullWidth 
                id='document_nr' 
                label='Passport Number' 
                sx={{ marginBottom: 4 }} 
                value={values.document_nr}
                onChange={handleChange('document_nr')}
                />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup row value={values.gender} onChange={handleChange('gender')} aria-label='gender' name='account-settings-info-radio'>
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
