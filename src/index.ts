import { NodePath, PluginObj } from '@babel/core';
import { TemplateBuilder } from '@babel/template';
import { TSExportAssignment } from '@babel/types';

export = (
  { template }: { template: TemplateBuilder<TSExportAssignment> }
): PluginObj => {
  const moduleExportsDeclaration = template(`
    module.exports = ASSIGNMENT;
  `);

  return {
    name: 'replace-ts-export-assignment',
    visitor: {
      TSExportAssignment(path: NodePath<TSExportAssignment>) {
        path.replaceWith(
          moduleExportsDeclaration({ ASSIGNMENT: path.node.expression })
        );
      }
    }
  };
};
