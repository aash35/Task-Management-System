<?php
class session_manager
{
    //all server side requests like logging, login, logout, rate limited, domain locking and referrer checks
    // are done here to split the areas of requests

    private $last_times = array();
    private $last_timestwo = array();
    private $user_id;
    private $user;
    private $name;
    private $access;
    private $login;



    // public function auth($user)
    // {
    //     if($user == $this->user_id){
    //         return true;
    //     }
    // }
    // public function managercheck()
    // {
    //     if($this->access == 2){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    public function load_session()
    {
        echo json_encode(array('user' => $this->user_id));
    }

    public function logging_query()
    {
        global $webapp;
        $referer = $_SERVER['HTTP_REFERER'];
        $source_ip = $_SERVER['REMOTE_ADDR'];
        $requested_url = $_SERVER['REQUEST_URI'];
        $webapp->logging($referer, $source_ip, $requested_url);
    }
    public function setting_user($user_details)
    {
        $this->user_id = $user_details['user_id'];
        $this->user = $user_details['user'];
        $this->name = $user_details['name'];
        $this->access = $user_details['access'];
        $this->login = $user_details['login'];
    }

    public function logout()
    {
        if (strlen($this->user_id) > 0) {
            $this->user_id = "";
            $this->user = "";
            $this->name = "";
            $this->access = "";
            $this->login = "";
            echo json_encode(array('Logout' => 'Complete'));
        } else {
            throw new Exception("Logout Failed");
        }
    }

    public function limit_1second()
    {
        //this rate limiter functions the same as the 24 hour one
        // loop through the last_times array 
        //increment a count on every time that is within one second
        //then check if the count is less then 50 (its 50 so i dont have to worry about it now)
        array_push($this->last_times, time());
        $count = 0;
        foreach ($this->last_times as $item) {
            if ($item == time()) {
                $count++;
            }
        }
        if ($count > 50) {
            return false;
        } else {
            return true;
        }
    }

    public function limit_24hour()
    {
        //this rate limiter checks the amount a user requests from the server within 24 hours
        //if it is over 1000 they are rate limited
        // it works by checking the array for every request within 24 hours
        //it then puts everything that is within 24 hours on another array which overrides the first array
        // then unsets the second array so it can be reused
        //it then returns true or false which will determine if the user is rate limited or not
        if (sizeof($this->last_times) > 0) {
            foreach ($this->last_times as $item) {
                if ($item > (time() - 86400)) {
                    array_push($this->last_timestwo, $item);
                }
            }
            $this->last_times = $this->last_timestwo;
            unset($this->last_timestwo);
            if (sizeof($this->last_times) > 10000) {
                return false;
            } else {
                return true;
            }
        }
    }
    public function rate_limit()
    {
        if ($this->limit_1second() == true) {
            if ($this->limit_24hour() == true) {
                return true;
            }
        }
    }

    public function domainlocked()
    {
        $domainlockname = '/model/';
        if (preg_match($domainlockname, $_SERVER['REQUEST_URI'])) {
            return true;
        }
    }
    public function referrerexists()
    {
        if (isset($_SERVER['HTTP_REFERER'])) {
            return true;
        } else {
            return false;
        }
    }
    public function logrequests()
    {
        if ($this->domainlocked() == true) {
            if ($this->referrerexists() == true) {
                return true;
            }
        }
    }
    public function ratechecker()
    {

        return $this->last_times;
    }
}
