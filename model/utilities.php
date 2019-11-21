<?php
header('Content-Type: text/json; charset=UFT-8');

class utilities
{
    public function validation($string, $case)
    {
        switch ($case) {
            case 'numberpos':
                if (isset($string)) {
                    if (is_numeric($string)) {
                        if ($string > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;

            case 'number':
                if (is_numeric($string)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'positive':
                if ($string > 0) {
                    return true;
                } else {
                    return false;
                }
                break;

            case 'name':
                if (isset($string)) {
                    if (preg_match("/^([a-zA-Z' ]+)$/", $string)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;

            case 'status':            
                if (isset($string)) {
                    if (preg_match("/^([a-zA-Z -]+)$/", $string)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;
                
            case 'date':
                $date = explode('-', $string);
                if (checkdate($date[1], $date[2], $date[0])){
                    return true;
                }
                break;

            case 'phone':
                if (isset($string)) {
                    $filtered_phone_number = filter_var($string, FILTER_SANITIZE_NUMBER_INT);
                    $phone_to_check = str_replace(" ", "", $filtered_phone_number);
                    if (strlen($phone_to_check) < 8 || strlen($phone_to_check) > 14) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
                break;

            case 'email':
                if (isset($string)) {
                    if (filter_var($string, FILTER_VALIDATE_EMAIL)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;

            case 'description':
                if (isset($string)) {
                    $string = preg_replace('/[\x00-\x1F\x7F\xA0]/u', '', $string);
                    return $string;
                } else {
                    return NULL;
                }
                break;


            case 'username':
                if (isset($string)) {
                    if (preg_match('/^[a-zA-Z0-9]{5,}$/', $string)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;

            case 'ctype_alpha':
                if (isset($string)) {
                    $string = str_replace(' ', '', $string);
                    if (ctype_alpha($string)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;
            case 'ctype_alnum':
                if (isset($string)) {                    
                    $string = str_replace(' ', '', $string);
                    if (ctype_alnum($string)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
                break;

            case 'password':
                if (!empty($string)) {
                    $passwordErr = "";
                    if (strlen($string) <= '4') {
                        $passwordErr .= "Your Password Must Contain At Least 5 Characters!";
                    }
                    if (!preg_match("#[0-9]+#", $string)) {
                        $passwordErr .= " Your Password Must Contain At Least 1 Number!";
                    }
                    // elseif (!preg_match("#[A-Z]+#", $string)) {
                    //     $passwordErr = "Your Password Must Contain At Least 1 Capital Letter!";
                    // } elseif (!preg_match("#[a-z]+#", $string)) {
                    //     $passwordErr = "Your Password Must Contain At Least 1 Lowercase Letter!";
                    // }
                } else {
                    $passwordErr = "Please enter password";
                }

                if (strlen($passwordErr) > '1') {
                    return $passwordErr;
                } elseif (strlen($passwordErr) < '1') {
                    return NULL;
                }
                break;

            default:
                throw new Exception("the correct validation case wasnt sent");
                break;
        }
    }
}
