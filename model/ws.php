<?php
header('Content-Type: text/json; charset=UFT-8');
include('session_classes.php');
include('db_classes.php');
include('utilities.php');
session_start();
try {
    //this is were i check if the session_manager has been set and if it isnt it is set
    if (!isset($_SESSION['user_session'])) {
        // new session_manager is called here so there is always tracking on a user
        //i.e. can rate limit them and check if they have a referrer
        $_SESSION['user_session'] = new session_manager;
    }
    if ($_SESSION['user_session']->logrequests() == true) {
        if ($_SESSION['user_session']->rate_limit() == true) {
            // new webapp was created here so that the switch statements can use its functions
            $webapp = new webapp;
            $utilities = new utilities;
            $_SESSION['user_session']->logging_query();
            if (isset($_GET['main'])) {
                switch ($_GET['main']) {
                    case 'logout':
                        $_SESSION['user_session']->logout();
                        // throw new Exception("logout error");
                        break;

                    case 'select_all_projects':
                        $webapp->select_all_projects();
                        break;

                    case 'validation':
                        echo json_encode(array('error' => ($utilities->validation($_GET['string'], 'ctype_alnum'))));
                        // if($utilities->validation($_GET['string'], 'password') == NULL){
                        //     echo "bigtest";
                        // }
                        // echo ("test");
                        // die();
                        break;

                    case 'delete_project':
                        if ($utilities->validation($_GET['project_delete'], 'numberpos') == true) {
                            $delete_project = $_GET['project_delete'];
                            $webapp->delete_projects($delete_project);
                        } else {
                            throw new Exception("incorrect project number");
                        }

                        break;

                    case 'rate_tester':
                        echo json_encode($_SESSION['user_session']->ratechecker());
                        // echo json_encode($webapp->conn());
                        break;
                    default:
                        throw new Exception("the correct GET main case wasnt sent");
                        break;
                }
            } else if (isset($_POST['main'])) {

                switch ($_POST['main']) {
                    case 'check_if_pass':
                        if ($utilities->validation($_POST['username'], 'username') == true) {
                            $user = $_POST['username'];
                            if ($webapp->check_if_pass($user) == 'not exists') {
                                echo json_encode(array('password' => 'not exists'));
                            } elseif ($webapp->check_if_pass($user) == 'exists') {
                                echo json_encode(array('password' => 'exists'));
                            } else {
                                echo json_encode(array('user' => 'doesnt exist'));
                            }
                        } else {
                            throw new Exception("username needs to be 5 character long, be characters and numbers");
                        }
                        break;

                    case 'login':
                        $user = $_POST['login_name'];
                        $pass = $_POST['pass'];
                        $user_details = $webapp->login($user, $pass);
                        if ($user_details != NULL) {
                            $_SESSION['user_session']->setting_user($user_details);
                            echo json_encode($user_details);
                        } else {
                            throw new Exception("login failed");
                        }
                        break;

                    case 'create_employee':
                        if ($utilities->validation($_POST['create_username'], 'username') == true) {
                            if ($utilities->validation($_POST['first'], 'name') == true) {
                                if ($utilities->validation($_POST['last'], 'name') == true) {
                                    if ($utilities->validation($_POST['email'], 'email') == true) {
                                        if ($utilities->validation($_POST['phone'], 'phone') == true) {
                                            if ($utilities->validation($_POST['job_type_user'], 'numberpos') == true) {
                                                $username = $_POST['create_username'];
                                                $firstname = ucfirst($_POST['first']);
                                                $lastname =  ucfirst($_POST['last']);
                                                $email =  $_POST['email'];
                                                $phone =  $_POST['phone'];
                                                $job_type_user = $_POST['job_type_user'];
                                                $access_rights =  2;
                                                $webapp->create_employee($username, $firstname, $lastname, $email, $phone, $job_type_user, $access_rights);
                                            } else {
                                                throw new Exception("job type incorrect format");
                                            }
                                        } else {
                                            throw new Exception("phone number incorrect format");
                                        }
                                    } else {
                                        throw new Exception("email incorrect format");
                                    }
                                } else {
                                    throw new Exception("last name incorrect format");
                                }
                            } else {
                                throw new Exception("first incorrect format");
                            }
                        } else {
                            throw new Exception("username needs to be 5 character long, be characters and numbers");
                        }
                        break;

                    case 'create_password':

                        if ($_POST['password_one'] == $_POST['password_again']) {
                            if ($utilities->validation($_POST['user_id_create'], 'username') == true) {
                                if ($utilities->validation($_POST['password_one'], 'password') == NULL) {
                                    $username = $_POST['user_id_create'];
                                    $password = $_POST['password_one'];
                                    $password = password_hash($password, PASSWORD_DEFAULT);
                                    $webapp->create_passwords($username, $password);
                                } else {
                                    throw new Exception("password incorrect format");
                                }
                            } else {
                                throw new Exception("username error");
                            }
                        } else {
                            throw new Exception("passwords didnt match");
                        }
                        break;

                    case 'create_job_type':
                        if ($utilities->validation($_POST['job_type_name'], 'ctype_alpha') == true) {
                            if (empty($_POST['job_type_description'])) {
                                $job_type_description = "";
                            } elseif (!empty($_POST['job_type_description'])) {
                                if ($utilities->validation($_POST['job_type_description'], 'description') != NULL) {
                                    $job_type_description = $utilities->validation($_POST['job_type_description'], 'description');
                                } else {
                                    throw new Exception("description incorrect format");
                                }
                            }
                            $job_type_name = ucwords($_POST['job_type_name']);
                            $webapp->create_job_type($job_type_name, $job_type_description);
                        } else {
                            throw new Exception("job type name incorrect format");
                        }

                        break;



                    case 'create_project':
                        // throw new Exception($_POST['project_start_date']);
                        if ($utilities->validation($_POST['project_name'], 'ctype_alnum') == true) {
                            if ($utilities->validation($_POST['project_description'], 'description') != NULL) {
                                if ($utilities->validation($_POST['project_start_date'], 'date') == true) {
                                    if ($utilities->validation($_POST['project_end_date'], 'date') == true) {
                                        if ($utilities->validation($_POST['num_task'], 'numberpos') == true) {
                                            $num_of_tasks = $_POST['num_task'];
                                            for ($i = 0; $i < $num_of_tasks; $i++) {
                                                if ($utilities->validation($_POST['task_name' . ($i + 1)], 'ctype_alnum') == true) {
                                                    if ($utilities->validation($_POST['task_description' . ($i + 1)], 'description') != NULL) {
                                                        if ($utilities->validation($_POST['task_order' . ($i + 1)], 'numberpos') == true) {
                                                            if ($utilities->validation($_POST['duration' . ($i + 1)], 'numberpos') == true) {
                                                                if ($utilities->validation($_POST['num_assign_emp' . ($i + 1)], 'numberpos') == true) {
                                                                    $num_assigned_emp = $_POST['num_assign_emp' . ($i + 1)];
                                                                    $num_assigned_emp_name = "num_assign_emp" . ($i + 1);
                                                                    for ($o = 0; $o < $num_assigned_emp; $o++) {
                                                                        if ($utilities->validation($_POST[$num_assigned_emp_name . "assign_emp" . ($o + 1)], 'numberpos') == true) { } else {
                                                                            throw new Exception("assigned_employee incorrect format");
                                                                        }
                                                                    }
                                                                } else {
                                                                    throw new Exception("num_assign_emp incorrect format");
                                                                }
                                                            } else {
                                                                throw new Exception("duration incorrect format");
                                                            }
                                                        } else {
                                                            throw new Exception("task order incorrect format");
                                                        }
                                                    } else {
                                                        throw new Exception("task description incorrect format");
                                                    }
                                                } else {
                                                    throw new Exception("task name incorrect format");
                                                }
                                            }
                                        } else {
                                            throw new Exception("number of tasks incorrect format");
                                        }
                                    } else {
                                        throw new Exception("date end incorrect format");
                                    }
                                } else {
                                    throw new Exception("date start incorrect format");
                                }
                            } else {
                                throw new Exception("project description incorrect format");
                            }
                        } else {
                            throw new Exception("project name incorrect format");
                        }
                        $project_array = $_POST;
                        $webapp->create_whole_project($project_array);
                        break;

                    case 'edit_status':
                        // $_SESSION['user_session']->auth();
                        if ($utilities->validation($_POST['task_status_id'], 'numberpos') == true) {
                            if ($utilities->validation($_POST['status'], 'status') == true) {
                                $task_status_id = $_POST['task_status_id'];
                                $status = $_POST['status'];
                                $webapp->edit_status($task_status_id, $status);
                            } else {
                                throw new Exception("status incorrect format");
                            }
                        } else {
                            throw new Exception("status incorrect format");
                        }
                        break;
                    default:
                        throw new Exception("the correct POST main case wasnt sent");
                        break;
                }
            } else if (isset($_GET['json'])) {
                switch ($_GET['json']) {

                    case 'load_job_type':
                        // if($_SESSION['user_session']->managercheck() == true){
                        $webapp->select_job_types();
                        // } else {
                        //     $_SESSION['user_session']->logout();
                        // }

                        break;

                    case 'pop_delete_project_id':
                        $webapp->select_project();
                        break;

                    case 'load_session':
                        $_SESSION['user_session']->load_session();
                        break;

                    case 'load_user_projects':
                        if ($utilities->validation($_GET['user'], 'numberpos') == true) {
                            $user = $_GET['user'];
                            $webapp->load_user_projects($user);
                        } else {
                            throw new Exception("user incorrect format");
                        }
                        break;

                    case 'load_project_tasks':
                        if ($utilities->validation($_GET['project_id'], 'numberpos') == true) {
                            $project_id = $_GET['project_id'];
                            $webapp->load_project_tasks($project_id);
                        } else {
                            throw new Exception("project incorrect format");
                        }
                        break;

                    case 'load_tasks_task_status':
                        if ($utilities->validation($_GET['task_id'], 'numberpos') == true) {
                            $task_id = $_GET['task_id'];
                            $webapp->load_tasks_task_status($task_id);
                        } else {
                            throw new Exception("task incorrect format");
                        }
                        break;

                    case 'all_employees':
                        $webapp->all_employees();
                        break;

                    default:
                        throw new Exception("the correct json case wasnt sent");
                        break;
                }
            } else if (isset($_GET['error']) || isset($_POST['error'])) {
                throw new Exception("error with system");
            } else {
                throw new Exception("main, json, error wasnt sent");
            }
        } else {
            throw new Exception("Too many request in a second or in 24 hours");
        }
    } else {
        throw new Exception("NO REFERRER OR DOMAIN LOCKED");;
    }
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}




// echo json_encode($msg);

// js: 600
// this: 290
// dbFunctions: 455

//ux consumes web services, 
// db object, session object, master controller
//session object connection, referrer
//cases will call a function that will complete a task and return an array that will be communication to the user
