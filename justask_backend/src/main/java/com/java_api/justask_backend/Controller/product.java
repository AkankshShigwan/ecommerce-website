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
import com.java_api.justask_backend.Controller.user.profile_dtls;
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
        public String product_img1;
        public String product_img2;
        public String product_img3;
        public String product_img4;
        public String product_price;
        public String product_desc;
        public int product_rating;
        public String product_dtls;
        public String category_name;
        public String cat_type;
        public String product_size;
        public String cat_name;
        public int m_actv;
    }

    public class cart_dtls {
        public int cart_cd;
        public String product_name;
        public int tag;
        public String tag_type;
        public String expected_delivery_date;
        public int price;
        public String product_img;
        public String delivery_charges;
        public String cart_size;
        public int product_cd;
        public String product_size;
        public String product_desc;
        public String m_cat_type;
        public int rating;
        public int m_actv;
    }

    public class orderdtls {
        public int id;
        public int product_cd;
        public String product_name;
        public int price;
        public String order_dt;
        public String delivery_dt;
        public int qty;
        public int paided_tag;
        public int m_actv;
        public String size;
        public int cart_cd;
        public int user_cd;
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
                String str_statement = "call \"justAskNext\".sp_save_product('"
                        + p_requestdata.p_auth_key + "','"
                        + p_requestdata.p_product_name + "','" + p_requestdata.p_product_desc
                        + "','" + p_requestdata.p_prduct_img1 + "','" + p_requestdata.p_prduct_img2
                        + "','" + p_requestdata.p_prduct_img3 + "','" + p_requestdata.p_prduct_img4
                        + "','" + p_requestdata.p_rating + "','" + p_requestdata.p_price
                        + "','" + p_requestdata.p_product_dtls + "'," + p_requestdata.p_cat_type
                        + ",'" + p_requestdata.p_size + "'," + p_requestdata.p_product_id
                        + ", 'return1');FETCH ALL IN \"return1\";";
                System.out.println("str_statement " + str_statement);
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
                String str_statement = "call \"justAskNext\".sp_get_product('"
                        + p_requestdata.p_auth_key + "',"
                        + p_requestdata.p_product_id + "," + p_requestdata.p_pgno
                        + "," + p_requestdata.p_pgsz + "," + p_requestdata.cat_type
                        + ", 'return1', 'return2');FETCH ALL IN \"return1\";FETCH ALL IN \"return2\";";

                ss.execute(str_statement);
                ss.getMoreResults();
                ResultSet rs = ss.getResultSet();

                while (rs.next()) {
                    product_dtls tmp_client = new product_dtls();

                    tmp_client.product_id = rs.getInt("product_id");
                    tmp_client.product_name = rs.getString("product_name");
                    tmp_client.product_img1 = rs.getString("product_img1");
                    tmp_client.product_img2 = rs.getString("product_img2");
                    tmp_client.product_img3 = rs.getString("product_img3");
                    tmp_client.product_img4 = rs.getString("product_img4");
                    tmp_client.product_price = rs.getString("product_price");
                    tmp_client.product_desc = rs.getString("product_desc");
                    tmp_client.product_rating = rs.getInt("product_rating");
                    tmp_client.product_dtls = rs.getString("prod_dtls");
                    tmp_client.cat_type = rs.getString("cat_type");
                    tmp_client.product_size = rs.getString("product_size");
                    tmp_client.category_name = rs.getString("category_name");
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
                result = new APIResponse(HttpStatus.OK, "Total " + data.size() + " Record/s received", data, m_tot_rec,
                        m_pnd_rec);
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

    public APIResponse save_cart(JdbcTemplate p_jdbc, productRequest p_requestdata) {
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
                String str_statement = "call \"justAskNext\".sp_save_cart('"
                        + p_requestdata.p_auth_key + "',"
                        + p_requestdata.p_product_cd
                        + "," + p_requestdata.p_tag + ",'" + p_requestdata.p_expected_delivery_date
                        + "','" + p_requestdata.p_size + "','" + p_requestdata.p_qty
                        + "','" + p_requestdata.p_delivery_charges + "'," + p_requestdata.p_user_cd + ","
                        + p_requestdata.p_isedit
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

    public APIResponse get_cart(JdbcTemplate p_jdbc, productRequest p_requestdata) {
        APIResponse result = new APIResponse(HttpStatus.OK);
        ArrayList<cart_dtls> data = new ArrayList<cart_dtls>();
        Connection conn = null;
        int m_tot_rec = 0;
        int m_pnd_rec = 0;
        try {
            if (p_jdbc != null) {
                DataSource ds = p_jdbc.getDataSource();
                conn = DataSourceUtils.getConnection(ds);
                Statement ss = conn.createStatement();
                String str_statement = "call \"justAskNext\".sp_get_cart('"
                        + p_requestdata.p_auth_key + "'," + p_requestdata.p_pgno
                        + "," + p_requestdata.p_pgsz + "," + p_requestdata.p_user_cd
                        + ", 'return1', 'return2');FETCH ALL IN \"return1\";FETCH ALL IN \"return2\";";

                ss.execute(str_statement);
                ss.getMoreResults();
                ResultSet rs = ss.getResultSet();

                while (rs.next()) {
                    cart_dtls tmp_client = new cart_dtls();

                    tmp_client.cart_cd = rs.getInt("cart_cd");
                    tmp_client.product_name = rs.getString("product_name");
                    tmp_client.tag = rs.getInt("tag");
                    tmp_client.expected_delivery_date = rs.getString("expected_delivery_date");
                    tmp_client.price = rs.getInt("price");
                    tmp_client.product_img = rs.getString("product_img");
                    tmp_client.delivery_charges = rs.getString("delivery_charges");
                    tmp_client.product_size = rs.getString("product_size");
                    tmp_client.product_cd = rs.getInt("product_cd");
                    tmp_client.product_desc = rs.getString("product_desc");
                    tmp_client.m_cat_type = rs.getString("m_cat_type");
                    tmp_client.rating = rs.getInt("rating");
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
                result = new APIResponse(HttpStatus.OK, "Total " + data.size() + " Record/s received", data, m_tot_rec,
                        m_pnd_rec);
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

    public APIResponse save_order(JdbcTemplate p_jdbc, productRequest p_requestdata) {
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
                String str_statement = "call \"justAskNext\".sp_save_order('"
                        + p_requestdata.p_auth_key + "',"
                        + p_requestdata.p_cart_cd
                        + ",'" + p_requestdata.p_qty
                        + "','" + p_requestdata.p_size
                        + "'," + p_requestdata.p_paided_tag
                        + "," + p_requestdata.p_user_cd
                        + "," + p_requestdata.p_isedit
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

    public APIResponse get_orders(JdbcTemplate p_jdbc, productRequest p_requestdata) {
        APIResponse result = new APIResponse(HttpStatus.OK);
        ArrayList<orderdtls> data = new ArrayList<orderdtls>();
        Connection conn = null;
        int m_tot_rec = 0;
        int m_pnd_rec = 0;
        try {
            if (p_jdbc != null) {
                DataSource ds = p_jdbc.getDataSource();
                conn = DataSourceUtils.getConnection(ds);
                Statement ss = conn.createStatement();
                String str_statement = "call \"justAskNext\".sp_get_orders('"
                        + p_requestdata.p_auth_key + "'," + p_requestdata.p_user_cd
                        + ", 'return1');FETCH ALL IN \"return1\";";
                System.out.println(str_statement);
                ss.execute(str_statement);
                ss.getMoreResults();
                ResultSet rs = ss.getResultSet();

                while (rs.next()) {
                    orderdtls tmp_client = new orderdtls();

                    tmp_client.id = rs.getInt("id");
                    tmp_client.product_cd = rs.getInt("product_cd");
                    tmp_client.product_name = rs.getString("product_name");
                    tmp_client.price = rs.getInt("price");
                    tmp_client.order_dt = rs.getString("order_dt");
                    tmp_client.delivery_dt = rs.getString("delivery_dt");
                    tmp_client.qty = rs.getInt("qty");
                    tmp_client.paided_tag = rs.getInt("paided_tag");
                    tmp_client.m_actv = rs.getInt("m_actv");
                    tmp_client.size = rs.getString("size");
                    tmp_client.cart_cd = rs.getInt("cart_cd");
                    tmp_client.user_cd = rs.getInt("user_cd");

                    data.add(tmp_client);
                }
                // result.data = data;

                rs.close();
                ss.close();
                conn.close();
                DataSourceUtils.releaseConnection(conn, ds);
                conn = null;
                result = new APIResponse(HttpStatus.OK, "Total " + data.size() + " Record/s received", data, m_tot_rec,
                        m_pnd_rec);
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

    public APIResponse cancel_orders(JdbcTemplate p_jdbc, productRequest p_requestdata) {
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
                String str_statement = "call \"justAskNext\".sp_cancel_order('"
                        + p_requestdata.p_auth_key + "'," + p_requestdata.p_user_cd
                        + "," + p_requestdata.p_order_cd
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
                result = new APIResponse(HttpStatus.OK, "Total " + data.size() + " Record/s received", data, m_tot_rec,
                        m_pnd_rec);
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
