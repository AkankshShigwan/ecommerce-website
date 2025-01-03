package com.java_api.justask_backend.Controller;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;

import com.java_api.justask_backend.RequestData.UserRequest;
import com.java_api.justask_backend.entities.APIResponse;

public class user {
    public class comm_result {
        public String msg;
        public int Status;
        public int refcode;
    }


    public APIResponse save_user(JdbcTemplate p_jdbc, UserRequest p_requestdata) {
        APIResponse result = new APIResponse(HttpStatus.OK);
        ArrayList<comm_result> data = new ArrayList<comm_result>();
        Connection conn = null;
        int m_tot_rec = 0;
        int m_pnd_rec = 0;
        try {
            if (p_jdbc != null) {
                DataSource ds = p_jdbc.getDataSource();
                conn = DataSourceUtils.getConnection(ds);
                Statement ss = conn.createStatement();
                String str_statement = "call \"JustAskNext\".sp_registration('"
                        + p_requestdata.p_auth_key + "','"
                        + p_requestdata.p_email + "','" + p_requestdata.p_name
                        + "','" + p_requestdata.p_mobile + "','" + p_requestdata.p_password
                        + "','" + p_requestdata.p_tag + "'," + p_requestdata.p_role
                        + ", 'return1');FETCH ALL IN \"return1\";";

                ss.execute(str_statement);
                ss.getMoreResults();
                ResultSet rs = ss.getResultSet();

                while (rs.next()) {
                    comm_result tmp_client = new comm_result();
                    tmp_client.msg = rs.getString("msg");
                    tmp_client.Status = rs.getInt("status");
                    tmp_client.refcode = rs.getInt("refcode");
                    data.add(tmp_client);
                }
                // result.data = data;

                rs.close();
                ss.close();
                conn.close();
                DataSourceUtils.releaseConnection(conn, ds);
                conn = null;
                result = new APIResponse(HttpStatus.OK, "Total " + data.size() + " Record/s received", data);
            }

        } catch (Exception e) {
            result = new APIResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR);
            result.message = e.getMessage();
        }

        finally {

            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

        }

        return result;
    }

}
