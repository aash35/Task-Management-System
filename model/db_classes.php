<?php
header('Content-Type: application/json');

class webapp
{
    // function of validation with two paramitars (the string, valadation action(numeric))

    // this conn is the connection to the database which is used often so it is contrusted here 
    private $conn;
    public function __construct()
    {
        $this->conn = new PDO("mysql:host=localhost;dbname=webapp", "root", "");
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    public function conn()
    {
        return $this->conn = new PDO("mysql:host=localhost;dbname=webapp", "root", "");
    }


    //all crud functions (par 2) are done here

    public function create_project($project_name, $project_description, $project_date_start, $project_date_end)
    {
        try {
            $stmt = $this->conn->prepare("INSERT INTO project (`project_name`, `date_start`, `date_end`, `project_leader_id`, `description`) 
                VALUES (:project_name, :project_date_start, :project_date_end , '1', :project_description)");
            $stmt->bindValue(':project_name', $project_name);
            $stmt->bindValue(':project_description', $project_description);
            $stmt->bindValue(':project_date_start', $project_date_start);
            $stmt->bindValue(':project_date_end', $project_date_end);
            $stmt->execute();
            $project_id = $this->conn->lastInsertId();
            // echo json_encode(array('Create Project' => 'Complete'));
            return $project_id;
        } catch (PDOException $e) {
            return false;
        }
    }
    public function logging($referer, $source_ip, $requested_url)
    {
        try {
            $stmt = $this->conn->prepare("INSERT INTO logging(logging_id, referrer, source_ip, requested_url, log_time) VALUES (logging_id, :referer, :source_ip, :requested_url, :log_time)");
            $stmt->bindValue(':referer', $referer);
            $stmt->bindValue(':source_ip', $source_ip);
            $stmt->bindValue(':requested_url', $requested_url);
            $stmt->bindValue(':log_time', date('Y-m-d H:i:s'));
            $stmt->execute();
        } catch (PDOException $e) {
            echo json_encode(array("Logging Failed" => $e->getMessage()));
            die();
        }
    }
    public function login($user, $pass)
    {
        try {
            $stmt = $this->conn->prepare("SELECT users_id, first_name, last_name, password, access_rights FROM users WHERE username=:user");
            $stmt->bindParam(':user', $user);
            $stmt->execute();
            $row = $stmt->fetch();
            if (password_verify($pass, $row['password'])) {
                $user_details = array("user_id" => $row['users_id'], "user" => $user, "name" => $row['first_name'] . " " . $row['last_name'], "access" => $row['access_rights'], "login" => true);
                return $user_details;
            } else {
                return NULL;
            }
        } catch (PDOException $e) {
            return NULL;
        }
    }
    public function create_task($task_name, $task_description, $task_order, $duration, $project_id)
    {
        $stmt = $this->conn->prepare("INSERT INTO task() 
                VALUES (task_id, :task_name, :task_description, :task_order, :duration, :project_id)");
        $stmt->bindValue(':task_name', $task_name);
        $stmt->bindValue(':task_description', $task_description);
        $stmt->bindValue(':task_order', $task_order);
        $stmt->bindValue(':duration', $duration);
        $stmt->bindValue(':project_id', $project_id);
        $stmt->execute();
        $task_id = $this->conn->lastInsertId();
        // echo json_encode(array('Create Task' => 'Complete'));
        return $task_id;
    }
    public function create_task_status($assigned_employee, $task_id)
    {
        $stmt = $this->conn->prepare("INSERT INTO task_status() 
                VALUES (task_status_id, 'Not Started', :assigned_employee, :task_id)");
        $stmt->bindValue(':assigned_employee', $assigned_employee);
        $stmt->bindValue(':task_id', $task_id);
        $stmt->execute();
        // echo json_encode(array('Create Task Status' => 'Complete'));
    }

    public function create_employee($username, $firstname, $lastname, $email, $phone, $job_type_user, $access_rights)
    {
        $stmt = $this->conn->prepare("INSERT INTO users() 
                VALUES (users_id, :username, NULL, :firstname, :lastname, :email, :phone, :access_rights, :job_type_id)");
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':firstname', $firstname);
        $stmt->bindValue(':lastname', $lastname);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':phone', $phone);
        $stmt->bindValue(':job_type_id', $job_type_user);
        $stmt->bindValue(':access_rights', $access_rights);
        $stmt->execute();
        $employee_id_return = $this->conn->lastInsertId();
        echo json_encode(array('users_id' => $employee_id_return, 'Fullname' => $firstname . $lastname));
    }
    public function create_passwords($username, $password)
    {
        $stmt = $this->conn->prepare("UPDATE users SET password = :password WHERE username = :username");
        $stmt->bindValue(':username', $username);
        $stmt->bindValue(':password', $password);
        $stmt->execute();
        echo json_encode(array('Password' => 'Complete'));
    }
    public function create_job_type($job_type_name, $job_type_description)
    {
        $stmt = $this->conn->prepare("INSERT INTO job_type() 
                VALUES (job_type_id, :job_type_name, :job_type_description)");
        $stmt->bindValue(':job_type_name', $job_type_name);
        $stmt->bindValue(':job_type_description', $job_type_description);
        $stmt->execute();
        $job_type_id_return = $this->conn->lastInsertId();
        echo json_encode(array('job_type_id' => $job_type_id_return, 'job_name' => $job_type_name, 'description' => $job_type_description));
    }

    public function load_user_projects($user)
    {
        $stmt = $this->conn->prepare("SELECT project.project_id, project.project_name, project.date_start, project.date_end, project.description
            FROM project
            INNER JOIN task ON project.project_id = task.project_id
            INNER JOIN task_status ON task.task_id = task_status.task_id
        WHERE task_status.user_id = :user");
        $stmt->bindValue(':user', $user);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }

    public function load_project_tasks($project_id)
    {
        $stmt = $this->conn->prepare("SELECT task_id, task_name, description, task_order, duration_hr
            FROM task
        WHERE project_id = :project_id");
        $stmt->bindValue(':project_id', $project_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }
    public function load_tasks_task_status($task_id)
    {
        $stmt = $this->conn->prepare("SELECT task_status.*, CONCAT(users.first_name, ' ', users.last_name) AS Fullname
            FROM task_status
            INNER JOIN users ON task_status.user_id = users.users_id
        WHERE task_id = :task_id");
        $stmt->bindValue(':task_id', $task_id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }
    public function all_employees()
    {
        $stmt = $this->conn->prepare("SELECT users_id, CONCAT(first_name, ' ', last_name) AS Fullname
            FROM users");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }

    public function edit_status($task_status_id, $status)
    {
        $stmt = $this->conn->prepare("UPDATE task_status  SET task_status = :status WHERE task_status_id = :task_status_id");
        $stmt->bindValue(':task_status_id', $task_status_id);
        $stmt->bindValue(':status', $status);
        $stmt->execute();
        echo json_encode(array('Task_Status_Update' => 'Complete'));
    }
    public function delete_projects($delete_project)
    {
        $stmt = $this->conn->prepare("DELETE FROM project WHERE project_id = :delete_project");
        $stmt->bindValue(':delete_project', $delete_project);;
        $stmt->execute();
        echo json_encode(array('Delete_Project' => 'Complete'));
    }

    public function select_user_tasks($user)
    {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM task_status WHERE user_id = :user");
            $stmt->bindValue(':user', $user);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $ex) {
            throw $ex;
        }
    }

    public function select_project()
    {

        try {
            $stmt = $this->conn->prepare("SELECT project_id, project_name FROM project");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $ex) {
            throw $ex;
        }
    }

    public function select_job_types()
    {

        try {
            $stmt = $this->conn->prepare("SELECT * FROM job_type");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($result);
        } catch (PDOException $ex) {
            throw $ex;
        }
    }
    public function check_if_pass($user)
    {
        $stmt = $this->conn->prepare("SELECT users_id, username, password FROM users WHERE username = :user");
        $stmt->bindValue(':user', $user);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($result as $row) {
            if ($row['password'] == NULL) {
                return 'not exists';
            } else {
                return 'exists';
            }
        }
    }

    public function create_whole_project($project_array)
    {
        global $utilities;
        try {
            $this->conn->beginTransaction();

            $project_name = ucwords($project_array['project_name']);
            $project_description = $utilities->validation($project_array['project_description'], 'description');
            $project_date_start = $project_array['project_start_date'];
            $project_date_end = $project_array['project_end_date'];
            $num_of_tasks = $project_array['num_task'];
            $project_id = $this->create_project($project_name, $project_description, $project_date_start, $project_date_end);
            for ($i = 0; $i < $num_of_tasks; $i++) {
                $task_name = ucwords($project_array['task_name' . ($i + 1)]);
                $task_description = $utilities->validation($project_array['task_description' . ($i + 1)], 'description');
                $task_order = $project_array['task_order' . ($i + 1)];
                $duration = $project_array['duration' . ($i + 1)];
                $num_assigned_emp = $project_array['num_assign_emp' . ($i + 1)];
                $num_assigned_emp_name = "num_assign_emp" . ($i + 1);
                $task_id = $this->create_task($task_name, $task_description, $task_order, $duration, $project_id);
                for ($o = 0; $o < $num_assigned_emp; $o++) {
                    $assigned_employee = $project_array[$num_assigned_emp_name . "assign_emp" . ($o + 1)];
                    $this->create_task_status($assigned_employee, $task_id);
                }
            }
            $this->conn->commit();
            echo json_encode(array('project_id' => $project_id, 'project_name' => $project_name));
        } catch (PDOException $e) {
            $this->conn->rollBack();
            throw $e;
        }
    }
}
