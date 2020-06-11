CREATE OR REPLACE VIEW WKF_VROLUSUARIORANDOM AS
SELECT pRol, pUsuario FROM wkf_rolUsuario
order by dbms_random.random;
