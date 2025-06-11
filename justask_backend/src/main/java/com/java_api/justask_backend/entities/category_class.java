package com.java_api.justask_backend.entities;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.java_api.justask_backend.RequestData.CategoryRequest;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;

public class category_class {
    public int id;
    public String cat_name;
    public int type;
    public String add_date;
    public int m_actv;

    public APIResponse getCategoryType(JdbcTemplate p_jdbc, CategoryRequest p_requestdata) {
        APIResponse result = new APIResponse(HttpStatus.OK);
        ArrayList<category_class> data = new ArrayList<category_class>();
        Connection conn = null;
        int m_tot_rec = 0;
        int m_pnd_rec = 0;
        try {
            if (p_jdbc != null) {
                DataSource ds = p_jdbc.getDataSource();
                conn = DataSourceUtils.getConnection(ds);
                Statement ss = conn.createStatement();
                String str_statement = "call \"justAskNext\".get_category_type('"
                        + p_requestdata.p_auth_key + "',"
                        + p_requestdata.p_usr_cd 
                        + ", 'return1');FETCH ALL IN \"return1\";";

                ss.execute(str_statement);
                ss.getMoreResults();
                ResultSet rs = ss.getResultSet();

                while (rs.next()) {
                    category_class tmp_client = new category_class();
                    tmp_client.id = rs.getInt("id");
                    tmp_client.cat_name = rs.getString("name");
                    tmp_client.type = rs.getInt("type");
                    tmp_client.add_date = rs.getString("m_created_at");
                    tmp_client.m_actv = rs.getInt("m_actv");
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
