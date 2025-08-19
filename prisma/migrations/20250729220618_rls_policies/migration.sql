-- Enable RLS and default-deny on tenant-scoped tables
ALTER TABLE "Facility" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UnitType" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Unit" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lease" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Reservation" ENABLE ROW LEVEL SECURITY;

-- Generic policy template: ONLY rows for current tenant
CREATE POLICY tenant_select_facility ON "Facility" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_facility ON "Facility" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

-- Repeat for all tenant-scoped tables:
CREATE POLICY tenant_select_unittype ON "UnitType" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_unittype ON "UnitType" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

CREATE POLICY tenant_select_unit ON "Unit" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_unit ON "Unit" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

CREATE POLICY tenant_select_customer ON "Customer" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_customer ON "Customer" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

CREATE POLICY tenant_select_lease ON "Lease" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_lease ON "Lease" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

CREATE POLICY tenant_select_payment ON "Payment" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_payment ON "Payment" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

CREATE POLICY tenant_select_reservation ON "Reservation" FOR SELECT
  USING ("tenantId" = current_setting('app.tenant_id', true));
CREATE POLICY tenant_modify_reservation ON "Reservation" FOR ALL
  USING ("tenantId" = current_setting('app.tenant_id', true))
  WITH CHECK ("tenantId" = current_setting('app.tenant_id', true));

-- Force RLS (deny if no policy matches)
ALTER TABLE "Facility" FORCE ROW LEVEL SECURITY;
ALTER TABLE "UnitType" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Unit" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Customer" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Lease" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Payment" FORCE ROW LEVEL SECURITY;
ALTER TABLE "Reservation" FORCE ROW LEVEL SECURITY;
