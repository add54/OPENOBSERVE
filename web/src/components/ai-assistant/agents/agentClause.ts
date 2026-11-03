// Copyright 2026 OpenObserve Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { type CapabilityAgent } from "@/composables/assistant";
import { agentPolicy, agentPurpose, DEFAULT_AGENT } from "@/composables/assistant/pure";
import type { I18nText, TranslateFn } from "@/types/i18n";

/** "Finds causes · Read-only"; the default agent has no purpose line of its own. */
export function agentClause(agent: CapabilityAgent | undefined, t: TranslateFn): I18nText {
  const policy = agentPolicy(agent, t);
  if (!agent || agent.id === DEFAULT_AGENT) return policy;
  return t("assistant.agent.clause", { purpose: agentPurpose(agent.id, t), policy });
}

/** The policy every agent of the roster shares, said once for the list instead of on each row. */
export function sharedAgentPolicy(
  agents: CapabilityAgent[] | null | undefined,
  t: TranslateFn,
): I18nText | null {
  if (!agents || agents.length < 2) return null;
  const policies = new Set(agents.map((agent) => String(agentPolicy(agent, t))));
  return policies.size === 1 ? agentPolicy(agents[0], t) : null;
}

/** A row's line under a shared policy: the purpose alone, and nothing for the default agent. */
export function agentRowClause(
  agent: CapabilityAgent,
  shared: boolean,
  t: TranslateFn,
): I18nText | null {
  if (!shared) return agentClause(agent, t);
  return agent.id === DEFAULT_AGENT ? null : agentPurpose(agent.id, t);
}
