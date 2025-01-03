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

import com.java_api.justask_backend.Controller.user.comm_result;
import com.java_api.justask_backend.RequestData.UserRequest;
import com.java_api.justask_backend.RequestData.productRequest;
import com.java_api.justask_backend.entities.APIResponse;

public class product {

    public class comm_result {
        public String msg;
        public int Status;
        public int refcode;
    }

    public class product_dtls {
        public int product_id;
        public String product_name;
        public String product_img;
        public String product_price;
        public String product_desc;
        public int product_rating;
        public String cat_type;
        public String product_size;
        public String cat_name;
        public int m_actv;
    }
    
    public APIResponse save_product(JdbcTemplate p_jdbc, productRequest p_requestdata) {
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
                String str_statement = "call \"JustAskNext\".sp_save_product('"
                        + p_requestdata.p_auth_key + "','"
                        + p_requestdata.p_product_name + "','" + p_requestdata.p_prduct_img
                        + "'," + p_requestdata.p_price + ",'" + p_requestdata.p_description
                        + "'," + p_requestdata.p_rating + "," + p_requestdata.p_cat_type 
                        + ",'" + p_requestdata.p_size
                        + "', 'return1');FETCH ALL IN \"return1\";";

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

    public APIResponse get_product(JdbcTemplate p_jdbc, productRequest p_requestdata) {
        APIResponse result = new APIResponse(HttpStatus.OK);
        ArrayList<product_dtls> data = new ArrayList<product_dtls>();
        Connection conn = null;
        int m_tot_rec = 0;
        int m_pnd_rec = 0;
        try {
            if (p_jdbc != null) {
                DataSource ds = p_jdbc.getDataSource();
                conn = DataSourceUtils.getConnection(ds);
                Statement ss = conn.createStatement();
                String str_statement = "call \"JustAskNext\".sp_get_product('"
                        + p_requestdata.p_auth_key + "',"
                        + p_requestdata.p_product_id + "," + p_requestdata.p_pgno
                        + "," + p_requestdata.p_pgsz + ",'" + p_requestdata.cat_type
                        + "', 'return1', 'return2');FETCH ALL IN \"return1\";FETCH ALL IN \"return2\";";

                System.out.println(str_statement);
                ss.execute(str_statement);
                ss.getMoreResults();
                ResultSet rs = ss.getResultSet();

                while (rs.next()) {
                    product_dtls tmp_client = new product_dtls();

                    tmp_client.product_id = rs.getInt("product_id");
                    tmp_client.product_name = rs.getString("product_name");
                    tmp_client.product_img = rs.getString("product_img");
                    tmp_client.product_price = rs.getString("product_price");
                    tmp_client.product_desc = rs.getString("product_desc");
                    tmp_client.product_rating = rs.getInt("product_rating");
                    tmp_client.cat_type = rs.getString("cat_type");
                    tmp_client.product_size = rs.getString("product_size");
                    tmp_client.cat_name = rs.getString("cat_name");
                    tmp_client.m_actv = rs.getInt("m_actv");

                    data.add(tmp_client);
                }
                // result.data = data;

                ss.getMoreResults();
                rs = ss.getResultSet();
                while (rs.next()) {
                    m_tot_rec = rs.getInt(1);
                    m_pnd_rec = rs.getInt(2);
                }

                rs.close();
                ss.close();
                conn.close();
                DataSourceUtils.releaseConnection(conn, ds);
                conn = null;
                result = new APIResponse(HttpStatus.OK, "Total " + data.size() + " Record/s received", data, m_tot_rec, m_pnd_rec);
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
